import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker, ToastAndroid } from 'react-native'
import { Container, Header, Title, Content, Form, Item, Input, Button, Label, Textarea, Left, Body, Right } from 'native-base';
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'

class AddProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            product_name: '',
            category_id: 0,
            product_price: '',
            product_desc: '',
            product_img: [],
            taken_pic: {},
            size_id: 0,
            color_id: 0,
            condition_id: 0,
            qty: '',
        }
    }

    setCategory = (e) => {
        this.setState({
            category_id: e
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

    chooseFile = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        })
            .then((images) => {
                console.log(images.length);
                this.setState({ product_img: images });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    takePicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        })
            .then((images) => {
                console.log(images.length);
                this.setState({ taken_pic: images });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    postProduct = () => {
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
                'Content-type': 'multipart/form-data',
            },
        };
        const data = new FormData();
        data.append('product_name', this.state.product_name);
        data.append('category_id', this.state.category_id);
        data.append('product_price', this.state.product_price);
        data.append('product_desc', this.state.product_desc);
        data.append('size_id', this.state.size_id);
        data.append('color_id', this.state.color_id);
        data.append('condition_id', this.state.condition_id);
        data.append('qty', this.props.auth.qty);
        data.append('user_id', this.props.auth.id);
        if (Object.keys(this.state.taken_pic).length != 0) {
            data.append('product_img', {
                name: this.state.taken_pic.path.split('/').pop(),
                type: this.state.taken_pic.mime,
                uri:
                    Platform.OS === 'android'
                        ? this.state.taken_pic.path
                        : this.state.taken_pic.path.replace('file://', ''),
            })
        }
        if (this.state.product_img[0]) {
            for (let i = 0; i < this.state.product_img.length; i++) {
                data.append('product_img',
                    {
                        name: this.state.product_img[i].path.split('/').pop(),
                        type: this.state.product_img[i].mime,
                        uri:
                            Platform.OS === 'android'
                                ? this.state.product_img[i].path
                                : this.state.product_img[i].path.replace('file://', ''),
                    }
                );
            }
        }

        console.log(data);
        axios
            .post(REACT_APP_BASE_URL + `/product/add-product`, data, config)
            .then((data) => {
                console.log(data.data);
                ToastAndroid.show('Produk berhasil ditambahkan', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                this.props.navigation.push('SellingProduct')  
            })
            .catch((err) => {
                console.log('error disini');
                console.log(err);
            });
    }

    render() {
        const { product_name, category_id, product_price, product_desc, product_img, size_id, color_id, qty } = this.state
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
                        <Title style={{ color: 'black', fontWeight: 'bold' }}>Add Product for Sale</Title>
                    </Body>
                </Header>

                <Content>
                    <ScrollView>
                        <View >
                            <Form>
                                <Label>Product Name :</Label>
                                <Item regular>
                                    <Input name="product_name" style={styles.formFont} value={product_name} onChangeText={(text) => { this.setState({ product_name: text }) }} />
                                </Item>
                                <Label >Category :</Label>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={category_id}
                                        onValueChange={(itemValue, itemIndex) => this.setCategory(itemValue)}
                                        style={styles.formFont}
                                    >
                                        <Picker.Item label=" " value="0" />
                                        <Picker.Item label="T-shirt" value="1" />
                                        <Picker.Item label="Short" value="2" />
                                        <Picker.Item label="Jacket" value="3" />
                                        <Picker.Item label="Pants" value="4" />
                                        <Picker.Item label="Shoes" value="5" />
                                    </Picker>
                                </View>
                                <Label >Size :</Label>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={size_id}
                                        onValueChange={(itemValue, itemIndex) => this.setSize(itemValue)}
                                        style={styles.formFont}
                                    >
                                        <Picker.Item label=" " value="0" style={{ backgroundColor: 'gray' }} />
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
                                <Label >Color :</Label>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={color_id}
                                        onValueChange={(itemValue, itemIndex) => this.setColor(itemValue)}
                                        style={styles.formFont}
                                    >
                                        <Picker.Item label=" " value="0" />
                                        <Picker.Item label="Red" value="1" />
                                        <Picker.Item label="Green" value="2" />
                                        <Picker.Item label="Blue" value="3" />
                                        <Picker.Item label="Black" value="4" />
                                    </Picker>
                                </View>
                                <Label >Conditions :</Label>
                                <View style={styles.size}>
                                    <Picker
                                        selectedValue={this.state.condition_id}
                                        onValueChange={(itemValue, itemIndex) => this.setCondition(itemValue)}
                                        style={styles.formFont}
                                    >
                                        <Picker.Item label=" " value="0" />
                                        <Picker.Item label="New" value="1" />
                                        <Picker.Item label="Second" value="2" />
                                    </Picker>
                                </View>

                                <Label >Price :</Label>
                                <Item regular>
                                    <Input name="price" style={styles.formFont} value={product_price} onChangeText={(text) => { this.setState({ product_price: text }) }} />
                                </Item>
                                <Label >Quantity :</Label>
                                <Item regular>
                                    <Input name="price" style={styles.formFont} value={qty} onChangeText={(text) => { this.setState({ qty: text }) }} />
                                </Item>
                                <Label>Description</Label>
                                <Textarea rowSpan={5} stackedLabel regular bordered name="description" value={product_desc} onChangeText={(text) => { this.setState({ product_desc: text }) }} />
                                <Label >Product Image :</Label>
                                <View style={{ flexDirection: 'row' }}>
                                    {product_img && product_img.map((item) => {
                                        return (
                                            <Image
                                                key={product_img.indexOf(item)}
                                                source={{ uri: product_img.length !== 0 ? item.path : '' }}
                                                style={styles.imageStyle}
                                            />
                                        );
                                    })}
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={{ uri: this.state.taken_pic.path }}
                                        style={styles.imageStyle}
                                    />
                                </View>
                                <View style={styles.btnWrap}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.btnSection}
                                        onPress={this.chooseFile}>
                                        <Text style={styles.btnText}>Choose File</Text>
                                        <Image source={require('../../assets/icons/folder.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.btnSection}
                                        onPress={this.takePicture}>
                                        <Text style={styles.btnText}>Take Picture</Text>
                                        <Image source={require('../../assets/icons/camera.png')} />
                                    </TouchableOpacity>
                                </View>
                            </Form>

                            <Button danger full rounded style={{ marginTop: 15 }} onPress={this.postProduct}>
                                <Text style={{ color: '#fff' }}> SUBMIT </Text>
                            </Button>
                        </View>
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

export default connect(mapStateToProps)(AddProduct);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    rowTitle: {
        marginTop: 14,
        marginLeft: 5
    },
    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    btnSection: {
        width: 125,
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
        borderColor: '#ebebeb',
        paddingHorizontal: 5,
        paddingBottom: 15,
        borderWidth: 1,
    },
    imageStyle: {
        width: 100,
        height: 100,
        margin: 5,
        // borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
    },
    btnWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    formFont: {
        height: 40,
        fontSize: 16
    }
})