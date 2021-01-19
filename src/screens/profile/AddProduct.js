import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Textarea } from 'native-base';
import { IconBack } from '../../assets'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'
import ImagePicker from 'react-native-image-picker'

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class AddProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            product_name: '',
            category_id: 0,
            product_price: '',
            product_desc: '',
            product_img: {},
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: ''
        }
    }

    setCategory = (e) => {
        this.setState({
            category_id: e
        })
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ product_img: response })
            }
        })
    }

    chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // alert(JSON.stringify(response));s
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });
    }

    render() {
        const { product_name, category_id, product_price, product_desc, product_img } = this.state
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack();
                }}>
                    <Image source={IconBack} />
                </TouchableOpacity>
                <View style={styles.rowTitle}>
                    <Text style={styles.textTitle}>Add Product</Text>
                </View>
                <ScrollView>
                    <View style={{ marginTop: 5 }}>
                        <Form>
                            <Item floatingLabel>
                                <Label >Product Name</Label>
                                <Input name="product_name" value={product_name} onChangeText={(text) => { this.setState({ product_name: text }) }} />
                            </Item>
                            <View style={styles.size}>
                                <Picker
                                    selectedValue={this.state.category_id}
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
                                <Input name="price" value={product_price} onChangeText={(text) => { this.setState({ product_price: text }) }} secureTextEntry={true} />
                            </Item>
                            <Textarea rowSpan={5} bordered placeholder="Description" name="description" value={product_desc} onChangeText={(text) => { this.setState({ product_desc: text }) }} secureTextEntry={true} />
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {product_img && (
                                    <Image
                                        source={{ uri: product_img.uri }}
                                        style={{ width: 300, height: 300 }}
                                    />
                                )}
                                <Button onPress={this.handleChoosePhoto}>
                                    <Text>Choose photo</Text>
                                </Button>
                            </View>

                            <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                                <Text style={styles.btnText}>Choose File</Text>
                            </TouchableOpacity>
                        </Form>

                        <TouchableOpacity onPress={this.signup}>
                            <Button danger full rounded style={{ marginTop: 15 }}>
                                <Text style={{ color: '#fff' }}> SUBMIT </Text>
                            </Button>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

export default AddProduct;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginTop: 25
    },
    rowTitle: {
        marginTop: 34
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