import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Textarea, Body, Left, Title, Right } from 'native-base';
import { IconBack } from '../../assets'
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
            thumbnailImg: ''
        }
    }

    setCategory = (e) => {
        this.setState({
            category_id: e
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

    getData = () => {
        axios.get(REACT_APP_BASE_URL + `/product/productId/` + this.props.route.params.itemId)
            .then(({ data }) => {
                this.setState({
                    product_name: '' + data.data[0].product_name,
                    category_id: '' + data.data[0].category_id,
                    product_price: '' + data.data[0].product_price,
                    product_desc: '' + data.data[0].product_desc,
                    // thumbnailImg:''+data.data[0].product_img
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    editProduct = () => {
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
        data.append('user_id', this.props.auth.id);
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


        console.log(data);
        axios
            .patch(REACT_APP_BASE_URL + `/product/updatePrd/` + this.props.route.params.itemId, data, config)
            .then((data) => {
                console.log(data.data);
                alert('produk berhasil dirubah')
            })
            .catch((err) => {
                console.log('error disini');
                console.log(err);
            });
    }

    componentDidMount = () => {
        this.getData()
    }

    render() {
        let { product_name, category_id, product_price, product_desc, product_img } = this.state
        // thumbnailImg = thumbnailImg.split(',')
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
                        <Title style={{ color: 'black', fontWeight: 'bold' }}>Edit Product</Title>
                    </Body>
                </Header>
                <Content>
                <ScrollView>
                    <View style={{ marginTop: 5 }}>
                        <Form>
                            <Item floatingLabel>
                                <Label >Product Name</Label>
                                <Input name="product_name" value={product_name} onChangeText={(text) => { this.setState({ product_name: text }) }} />
                            </Item>
                            <View style={styles.size}>
                                <Picker
                                    selectedValue={category_id}
                                    onValueChange={(itemValue, itemIndex) => this.setCategory(itemValue)}
                                >
                                    <Picker.Item label="Category" value="0" style={{ backgroundColor: 'gray' }} />
                                    <Picker.Item label="T-shirt" value="1" />
                                    <Picker.Item label="Short" value="2" />
                                    <Picker.Item label="Jacket" value="3" />
                                    <Picker.Item label="Pants" value="4" />
                                    <Picker.Item label="Shoes" value="5" />
                                </Picker>
                            </View>
                            <Item floatingLabel>
                                <Label >Price</Label>
                                <Input name="price" value={product_price} onChangeText={(text) => { this.setState({ product_price: text }) }} />
                            </Item>
                            <Textarea rowSpan={5} bordered placeholder="Description" name="description" value={product_desc} onChangeText={(text) => { this.setState({ product_desc: text }) }} />

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
                            {/* <View style={{ flexDirection: 'row' }}>
                                {thumbnailImg && thumbnailImg.map((item) => {
                                    return (
                                        <Image
                                            // key={thumbnailImg.indexOf(item)}
                                            source={{ uri: REACT_APP_BASE_URL+item}}
                                            style={styles.imageStyle}
                                        />
                                    );
                                })}
                            </View> */}

                            <View style={{ flexDirection: 'row' }}>

                                <Image
                                    source={{ uri: this.state.taken_pic.path }}
                                    style={styles.imageStyle}
                                />

                            </View>

                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.btnSection}
                                onPress={this.chooseFile}>
                                <Text style={styles.btnText}>Choose Image</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.btnSection}
                                onPress={this.takePicture}>
                                <Text style={styles.btnText}>Take Picture</Text>
                            </TouchableOpacity>
                        </Form>


                        <Button danger full rounded style={{ marginTop: 15 }} onPress={this.editProduct}>
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
    imageStyle: {
        width: 200,
        height: 200,
        width: 100,
        height: 100,
        margin: 5,
        // borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
    },
})