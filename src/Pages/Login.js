import { 
    Container, 
    Row, 
    Col,
    Form,
    FormGroup,
    Input, 
    Label,
    Button
} from "reactstrap";

import MainColors from "../assets/colors/MainColors";
import fonts from "../assets/fonts/Fonts";
import { useEffect, useState } from "react";
import LoginApi from "../Services/LoginApi";
import UserDataService from "../Services/UserDataService";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginApi = LoginApi.getInstance();
    const userDataService = UserDataService.getInstance();
    const navigate = useNavigate();

    useEffect(() => {
        if(!!userDataService.isSessionExpired())
        {
            console.log("expirou!");
            userDataService.clearUser();
            
        }
        else{
            console.log("não expirou!");
            navigate('/home');
        }
    }, [])

    return <>
    
        <Container fluid>
        
            <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100vh"}}>

                <Col md="4">

                </Col>
                <Col md="4">
                    <Row>
                        <Col className="text-center mt-3" xl="12">
                        
                            <h3 style={{fontFamily: fonts.title, fontWeight: '700'}}>Bem vindo à Loja de Jogos!</h3>
                        </Col>
                    </Row>

                    <Row className="mt-4 mb-4" style={{backgroundColor: MainColors.fourth, color: "black", borderRadius: "5px"}}>

                        <Col className="mt-3" xl="12">
                            <Row>
                                <Col className="text-center" xl="12">
                                    <h4 style={{fontFamily: fonts.title, fontWeight: '700'}}>Faça seu login aqui!</h4>
                                </Col>
                            </Row>
                        </Col>
                        
                        <Col xl="12">
                            <Form style={{fontFamily: fonts.title}}>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Email
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">
                                    Senha
                                    </Label>
                                    <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Senha"
                                    type="password"
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    />
                                </FormGroup>
                                <Row className="mt-3 mb-3 text-center">
                                    <Col>
                                        <Button color="success"
                                        onClick={async () => {

                                            const data = {
                                                email: email,
                                                password: password,
                                                systemId: 3
                                            }

                                            await loginApi.login(data).then((res) => {
                                                console.log(res);
                                                if(res?.response?.data?.event == "success")
                                                {
                                                    alert("logado");
                                                    userDataService.saveUser(res?.response?.data?.data);
                                                    navigate("/home");
                                                }
                                                

                                                
                                                console.log(res);
                                            }).catch((err) => {
                                                alert("erro");
                                                console.log(err);
                                            })
                                        }}
                                        >
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    
    </>
}