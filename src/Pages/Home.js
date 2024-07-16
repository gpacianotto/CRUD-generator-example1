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

import UserDataService from "../Services/UserDataService";
import { useEffect, useState } from "react";
import ProductsApi from "../Services/ProductsApi";
import { Link } from "react-router-dom";
export default function Home() {

    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const userDataService = UserDataService.getInstance();
    const user = userDataService.loadUser();
    const productsApi = ProductsApi.getInstance();
    
    useEffect(() => {
        async function getRows() {
            await productsApi.list(page).then((result) => {
                setRows(result?.response?.data?.rows);
                console.log(result);
            })
        }

        getRows();
    }, [])

    return <>
    <Container fluid>
        
        <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100vh"}}>
            <Col md="3">
            </Col>
            <Col md="6">
                <h1>HOME</h1>
                    <Card style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            Produtos
                        </CardHeader>
                        <CardBody>
                            <Row>
                                {rows.map((row) => <>
                                    <Col className="text-center" md="4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>{row?.title}</CardTitle>
                                            </CardHeader>
                                            <CardBody>
                                                <img style={{height: 150, width:150}} src={row?.imageUrl}></img>
                                                <p className="m-0">Preço: {row?.price}</p>
                                                <p className="m-0">Descrição: {row?.description}</p>
                                                
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </>)}
                            </Row>

                            { user.account.role === "admin" &&
                                <Row className="mt-3">
                                    <Col className="text-end" md="12">
                                        <Link to="/new-game">
                                            <Button>
                                                Novo Jogo
                                            </Button>
                                        </Link>
                                        
                                    </Col>
                                </Row>
                            }
                            
                        </CardBody>
                    </Card>
            </Col>
        </Row>
    </Container>

    
    </>
}