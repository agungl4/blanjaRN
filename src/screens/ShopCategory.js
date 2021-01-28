import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, Picker, TouchableHighlight } from 'react-native';
import CardCategory from '../components/CardProduct'
import { Container, Header, Title, Content, Button, Left, Body, Right, CheckBox } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid'
import { REACT_APP_BASE_URL } from "@env"
import axios from 'axios'

class ShopCategory extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        products: [],
        modalVisible: false,
        modalSortVisible: false,
        isRed: false,
        isGreen: false,
        isBlue: false,
        isBlack: false,
        color: 0,
        sizeSelected: 0,
        catSelected: 0,
        selectedBrand: 0,
        axiosData: '',
        itemNotFound: '',
        pageInfo: [],
    }

    checkedRed = () => {
        this.setState({
            isRed: !this.state.isRed,
            isGreen: false,
            isBlue: false,
            isBlack: false,
        })
        if (this.state.color == 1) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 1
            })
        }
    }

    checkedGreen = () => {
        this.setState({
            isRed: false,
            isGreen: !this.state.isGreen,
            isBlue: false,
            isBlack: false,
        })
        if (this.state.color == 2) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 2
            })
        }
    }

    checkedBlue = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: !this.state.isBlue,
            isBlack: false,
        })
        if (this.state.color == 3) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 3
            })
        }
    }

    checkedBlack = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: false,
            isBlack: !this.state.isBlack,
        })
        if (this.state.color == 4) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 4
            })
        }
    }

    setSelectedValue = (e) => {
        this.setState({
            selectedBrand: e
        })
    }


    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    setModalSortVisible = (visible) => {
        this.setState({ modalSortVisible: visible });
    }

    Discard = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: false,
            isBlack: false,
            color: 0,
            sizeSelected: 0,
            catSelected: 0,
            selectedBrand: 0,
            modalVisible: false,
            baseUrl: ''
        })
    }

    Apply = () => {
        let axiosData = ''
        if (this.state.color != 0) {
            axiosData += `color=${this.state.color}&`
        }
        if (this.state.sizeSelected != 0) {
            axiosData += `size=${this.state.sizeSelected}&`
        }
        if (this.state.catSelected != 0) {
            axiosData += `category=${this.state.catSelected}&`
        }
        this.setState({
            axiosData: axiosData
        })
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        axios.get(REACT_APP_BASE_URL + `${this.state.baseUrl}${modifiedUrl}` + axiosData)
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    modalVisible: false
                })
            })
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    products: [],
                    modalVisible: false
                })
            })
    }

    nextPage = () => {
        const nextPage = this.state.pageInfo.nextpage
        if (nextPage != null) {
            axios.get(REACT_APP_BASE_URL + nextPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    refresh = () => {
        axios.get(REACT_APP_BASE_URL + this.state.baseUrl)
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    prevPage = () => {
        const prevPage = this.state.pageInfo.previousPage
        if (prevPage != null) {
            axios.get(REACT_APP_BASE_URL + prevPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    nameAsc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(REACT_APP_BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_name&orderBy=asc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    nameDesc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(REACT_APP_BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_name&orderBy=desc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    priceAsc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(REACT_APP_BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_price&orderBy=asc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    priceDesc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(REACT_APP_BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_price&orderBy=desc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    rating = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(REACT_APP_BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.props.route.params.ctgId == 'new') {
                axios.get(REACT_APP_BASE_URL + '/products?sortBy=updated_at&orderBy=desc')
                    .then(({ data }) => {
                        // console.log(data.data.products)
                        this.setState({
                            products: data.data.products,
                            baseUrl: '/products?'
                        })
                    }).catch(err => {
                        console.log(err)
                    })
            } else {
                axios.get(REACT_APP_BASE_URL + '/products?category=' + this.props.route.params.ctgId)
                    .then(({ data }) => {
                        // console.log(data.data.products)
                        this.setState({
                            products: data.data.products,
                            baseUrl: '/products?category=' + this.props.route.params.ctgId
                        })
                    }).catch(err => {
                        console.log(err)
                    })
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        const { modalVisible, products, pageInfo, modalSortVisible } = this.state;
        let sizeS = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 1 }) }} style={styles.btnSize}><Text>S</Text></Button>
        let sizeM = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 2 }) }} style={styles.btnSize}><Text>M</Text></Button>
        let sizeL = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 3 }) }} style={styles.btnSize}><Text>L</Text></Button>
        if (this.state.sizeSelected == 1) {
            sizeS = <Button danger small onPress={() => { this.setState({ sizeSelected: 1 }) }}><Text>S</Text></Button>
        } else if (this.state.sizeSelected == 2) {
            sizeM = <Button danger small onPress={() => { this.setState({ sizeSelected: 2 }) }}><Text>M</Text></Button>
        } else if (this.state.sizeSelected == 3) {
            sizeL = <Button danger small onPress={() => { this.setState({ sizeSelected: 3 }) }}><Text>L</Text></Button>
        }
        return (
            <>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>{this.props.route.params.ctgName}</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={this.refresh}
                        >
                            <Image source={require('../assets/icons/refresh.png')} />
                        </Button>
                    </Right>
                </Header>
                <Container>
                    <View style={styles.filter}>
                        <Grid>
                            <Col>
                                <TouchableOpacity
                                    // onPress={() => { this.props.navigation.navigate('Filter') }}
                                    onPress={() => {
                                        this.setModalVisible(true)
                                    }}
                                >
                                    <Text style={styles.txtFilter}> Filter </Text>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalSortVisible(true)
                                    }}
                                >
                                    <Text style={styles.txtFilter}> Sort </Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>

                    <ScrollView>
                        <View style={styles.grid} >
                            {
                                products && products.map(({ product_id, product_name, product_price, category_name, color_name, size_name, rating, dibeli, product_img }) => {
                                    let img = product_img.split(',')[0];
                                    // console.log(img);
                                    return (
                                        <CardCategory id={product_id} name={product_name} price={product_price} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} image={img} navigation={this.props.navigation} />
                                    )
                                })
                            }

                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button full bordered light style={styles.btnPage}
                            onPress={this.prevPage}
                        >
                            <Text>{`<<<`}</Text>
                        </Button>
                        <Button full bordered light style={styles.btnPage}>
                            <Text>{pageInfo.currentPage}</Text>
                        </Button>
                        <Button full bordered light style={styles.btnPage}
                            onPress={this.nextPage}
                        >
                            <Text>{`>>>`}</Text>
                        </Button>
                    </View>
                </Container>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Content style={{ backgroundColor: '#f0f0f0' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 15 }}>Color</Text>
                                <View style={{ height: 80, backgroundColor: 'white' }}>
                                    <View style={{ marginTop: 15, marginRight: 15, flexDirection: 'row', justifyContent: "space-around" }}>
                                        <CheckBox color="red" checked={this.state.isRed} style={styles.btnColor} onPress={this.checkedRed} />
                                        <CheckBox color="green" checked={this.state.isGreen} style={styles.btnColor} onPress={this.checkedGreen} />
                                        <CheckBox color="blue" checked={this.state.isBlue} style={styles.btnColor} onPress={this.checkedBlue} />
                                        <CheckBox color="black" checked={this.state.isBlack} style={styles.btnColor} onPress={this.checkedBlack} />
                                    </View>
                                </View>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 15 }}>Sizes</Text>
                                <View style={{ height: 60, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30 }}>
                                    {sizeS}
                                    {sizeM}
                                    {sizeL}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginHorizontal: 15 }}>
                                    <Button full rounded bordered dark style={styles.btn}
                                        onPress={this.Discard}
                                    >
                                        <Text>Discard</Text>
                                    </Button>
                                    <Button full rounded danger style={styles.btn}
                                        onPress={this.Apply}
                                    >
                                        <Text>Apply</Text>
                                    </Button>
                                </View>
                            </Content>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalSortVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalSortView}>
                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white' }}>Close [x]</Text>
                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Sort By</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalSortVisible(false)
                                        }}
                                    >
                                        <Text>Close [x]</Text>
                                    </TouchableOpacity>
                                </View>
                                <Button transparent style={styles.btnModal}
                                    onPress={this.nameDesc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Name: Z-A</Text>
                                </Button>
                                <Button transparent style={styles.btnModal}
                                    onPress={this.nameAsc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Name: A-Z</Text>
                                </Button><Button transparent style={styles.btnModal}
                                    onPress={this.priceAsc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Price: Low to High</Text>
                                </Button><Button transparent style={styles.btnModal}
                                    onPress={this.priceDesc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Price: High to Low</Text>
                                </Button><Button transparent style={styles.btnModal}
                                    onPress={this.rating}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Rating</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

export default ShopCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: 10
    },
    filter: {
        marginLeft: 10,
        marginBottom: 10, flexDirection: 'row',
        justifyContent: 'center'
    },
    txtFilter: {
        fontSize: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DB3022",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    ctgTitle: {
        fontFamily: 'Metropolis-Bold',
        fontSize: 34,
        fontWeight: '700',
        marginTop: 5,

    },
    btnTitle: {
        color: '#fff',
        fontSize: 35,
    },
    btnSub: {
        color: '#fff',
        fontSize: 18,
    },
    card: {
        marginVertical: 10
    },
    cardTitle: {
        flex: 1,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        height: 400,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalSortView: {
        margin: 20,
        height: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    btn: {
        width: 80
    },
    btnSize: {
        width: 30,
        justifyContent: 'center',
        color: '#d9534f'
    },
    btnColor: {
        borderRadius: 30,
        width: 30,
        height: 30
    },
    btnModal: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: 330,

    },
    btnPage: {
        alignItems: "center",
        // backgroundColor: "#DB3022",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: 70
    },
});