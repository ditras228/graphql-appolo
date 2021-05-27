import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/user";
import {CREATE_USER} from "./mutation/user";

const App = () => {
    const {data, loading, refetch} = useQuery(GET_ALL_USERS, {pollInterval: 500})
    const [newUser] = useMutation(CREATE_USER)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])
    if (loading)
        return <Spinner animation={'grow'}/>
    const addUser = () => {
        newUser({
            variables: {
                input: {
                   username, age
                }

            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }
    const getAll = (e) => {
        e.preventDefault()
        refetch()
    }
    return (
        <Container style={{ margin: '60px    auto'}}>
            <Row>
                <Col>
                    <Card style={{maxWidth: 600, padding:20}}>
                        <Form>
                            <Form.Group>
                                <Form.Text>Name</Form.Text>
                                <Form.Control placeholder={'Enter name...'}
                                              value={username}
                                              onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Text>Age</Form.Text>
                                <Form.Control placeholder={'Age'}
                                              value={age}
                                              onChange={e => setAge(parseInt(e.target.value))}
                                              type={'number'}/>
                            </Form.Group>

                        </Form>
                        <Button
                            style={{marginBottom: 10}}
                            onClick={addUser}
                            variant={"primary"}>Создать</Button>
                        <Button
                            onClick={getAll}
                            variant="outline-primary">Получить</Button>{' '}
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Row style={{padding: 20}}>
                            <Col sm={4}>
                                ID
                            </Col>
                            <Col  sm={4} >
                                Имя
                            </Col>
                            <Col sm={4}>
                                Возраст
                            </Col>
                        </Row>
                        {users.map(user => (
                                <Row style={{padding: 20}}>
                                    <Col sm={4}>
                                        {user.id}

                                    </Col>
                                    <Col  sm={4} >
                                        {user.username}
                                    </Col>
                                    <Col sm={4}>
                                        {user.age}
                                    </Col>
                                </Row>
                            )
                        )}
                    </Card>
                </Col>
            </Row>


        </Container>
    );
}

export default App;
