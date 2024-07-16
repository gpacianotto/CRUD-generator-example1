import { 
    Container, 
    Row, 
    Col,
    Form,
    FormGroup,
    Input, 
    Label,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle
} from "reactstrap";
import MainColors from "../assets/colors/MainColors";
import { useState } from "react";
import ProductsApi from "../Services/ProductsApi";
export default function NewGame() {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [URL, setURL] = useState("");

    const productsApi = ProductsApi.getInstance();
    
    return <>
        <Container fluid>
        
            <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100vh"}}>
                <Col md="3">
                </Col>
                <Col  md="6">
                    <h1>Novo Jogo</h1>
                    <Card style={{ color: MainColors.primary}}>
                        <CardHeader>
                            <CardTitle>
                                Cadastro de novo Jogo
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label>Título</Label>
                                    <Input 
                                    type="text"
                                    onChange={(e) => {setTitle(e.target.value)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Descrição</Label>
                                    <Input 
                                    type="text"
                                    onChange={(e) => {setDescription(e.target.value)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Preço</Label>
                                    <Input 
                                    type="text"
                                    onChange={(e) => {setPrice(e.target.value)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>URL da Imagem</Label>
                                    <Input 
                                    type="text"
                                    onChange={(e) => {setURL(e.target.value)}}
                                    />
                                </FormGroup>
                                <Row>
                                    <Col className="text-center" md="12">
                                        <Button color="success"
                                            onClick={async () => {
                                                const data = {
                                                    values: {
                                                        title: title,
                                                        description: description,
                                                        price: price,
                                                        imageUrl: URL
                                                    }
                                                };

                                                await productsApi.createProduct(data).then((res) => {
                                                    if(res.status === "success")
                                                    {
                                                        alert(res.message)
                                                    }

                                                    else {
                                                        console.log("erro: ", res);
                                                        alert("oops algo deu errado");
                                                    }
                                                }).catch(err => {
                                                    console.log("erro: ", err);
                                                    alert("oops erro interno!")
                                                })
                                            }}
                                        >
                                            Salvar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    
    </>
}