import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Title, Left, Body } from 'native-base';
import { IconBack } from '../../assets'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'
import { connect } from 'react-redux'

class AddStock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            product_name: [],
            product_id: '',
            size_id: 0,
            color_id: 0,
            condition_id: 0,
            qty: '',
            selectedProduct: 0
        }
    }

    getAlldata = () => {
        axios.get(REACT_APP_BASE_URL + `/products/showAll/` + this.props.auth.id)
            .then(({ data }) => {
                this.setState({
                    product_name: data.data,
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    setProduct = (e) => {
        this.setState({
            selectedProduct: e
        })
    }

    setSize = (e) => {
        this.setState({
            size_id: e
        })
    }

    setColor = (e) => {
        this.setState({
            color_id: e
        })
    }

    setCondition = (e) => {
        this.setState({
            condition_id: e
        })
    }

    addStock = () => {
        const data = {
            product_id: this.state.selectedProduct,
            size_id: this.state.size_id,
            color_id: this.state.color_id,
            condition_id: this.state.condition_id,
            qty: this.state.qty
        }

        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                "x-access-token": "Bearer " + this.props.auth.token
            },
        }

        console.log(data)

        axios.post(REACT_APP_BASE_URL + '/product/add-stock', data, config)
            .then(({ data }) => {
                alert(data.data.msg)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        this.getAlldata()
    }


    render() {
        const { product_name, size_id, color_id, qty, selectedProduct, } = this.state
        // console.log(product_name)
        console.log(this.state)
        return (
            <Container style={styles.container}>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('./../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', fontWeight: 'bold' }}>Add Stock Product</Title>
                    </Body>
                </Header>

                <Content>
                    <ScrollView>
                        <View style={styles.rowTitle}>
                            <Text style={styles.textTitle}>Add Stock</Text>
                        </View>
                        <Form>
                            <Label >Choose Product :</Label>
                            {/* <Input name="product_name" value={product_name} /> */}
                            <TouchableOpacity>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={selectedProduct}
                                        onValueChange={(itemValue, itemIndex) => this.setProduct(itemValue)}
                                    >
                                        <Picker.Item label="Product" value="0" style={{ backgroundColor: 'gray' }} />
                                        {
                                            product_name && product_name.map(({ id, product_name }) => {
                                                return <Picker.Item label={product_name} value={id} />
                                            })
                                        }

                                    </Picker>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={size_id}
                                        onValueChange={(itemValue, itemIndex) => this.setSize(itemValue)}
                                    >
                                        <Picker.Item label="Size" value="0" style={{ backgroundColor: 'gray' }} />
                                        <Picker.Item label="S" value="1" />
                                        <Picker.Item label="M" value="2" />
                                        <Picker.Item label="L" value="3" />
                                        <Picker.Item label="28" value="4" />
                                        <Picker.Item label="29" value="5" />
                                        <Picker.Item label="30" value="6" />
                                        <Picker.Item label="31" value="7" />
                                        <Picker.Item label="32" value="8" />
                                        <Picker.Item label="33" value="9" />
                                        <Picker.Item label="34" value="10" />
                                        <Picker.Item label="35" value="11" />
                                        <Picker.Item label="36" value="12" />
                                        <Picker.Item label="37" value="13" />
                                        <Picker.Item label="38" value="14" />
                                        <Picker.Item label="39" value="15" />
                                        <Picker.Item label="40" value="16" />
                                        <Picker.Item label="41" value="17" />
                                        <Picker.Item label="42" value="18" />
                                    </Picker>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={color_id}
                                        onValueChange={(itemValue, itemIndex) => this.setColor(itemValue)}
                                    >
                                        <Picker.Item label="Color" value="0" />
                                        <Picker.Item label="Red" value="1" />
                                        <Picker.Item label="Green" value="2" />
                                        <Picker.Item label="Blue" value="3" />
                                        <Picker.Item label="Black" value="4" />
                                    </Picker>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={this.state.condition_id}
                                        onValueChange={(itemValue, itemIndex) => this.setCondition(itemValue)}
                                    >
                                        <Picker.Item label="Condition" value="0" />
                                        <Picker.Item label="New" value="1" />
                                        <Picker.Item label="Second" value="2" />
                                    </Picker>
                                </View>
                            </TouchableOpacity>
                            <Item floatingLabel>
                                <Label >Quantity</Label>
                                <Input name="quantity" value={qty} onChangeText={(text) => { this.setState({ qty: text }) }} />
                            </Item>
                        </Form>
                        <Button danger full rounded style={{ marginTop: 15 }}
                            onPress={this.addStock}
                        >
                            <Text style={{ color: '#fff' }}> SUBMIT </Text>
                        </Button>
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(AddStock);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    rowTitle: {
        marginVertical: 14,
        marginLeft: 5
    },
    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    },
    size: {
        width: '100%',
        height: 40,
        // paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#9B9B9B',
        paddingHorizontal: 5,
        paddingBottom: 15
    },
})