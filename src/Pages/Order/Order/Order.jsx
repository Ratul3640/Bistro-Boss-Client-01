import React, { useState } from 'react';
import orderCoverImg from '../../../assets/shop/order.jpg'
import Cover from '../../Sheard/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
// import FoodCard from '../../../Components/FoodCard/FoodCard';
import OrderTap from '../OrderTap/OrderTap';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drienks']
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setIndex] = useState(initialIndex)
    const [menu] = useMenu();
    // console.log(category);

    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            {/* <Helmet>
                <title>Bistro Boss | Order Food</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet> */}
            <Cover img={orderCoverImg} title="Order Food"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desssert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                {/* <TabPanel>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {
                            salad.map(item => <FoodCard
                                key={item._id}
                                item={item}
                            ></FoodCard>)
                        }
                    </div>
                </TabPanel> */}
                <TabPanel>
                    <OrderTap items={salad}></OrderTap>
                </TabPanel>
                <TabPanel>
                    <OrderTap items={pizza}></OrderTap>
                </TabPanel>
                <TabPanel>
                    <OrderTap items={soup}></OrderTap>
                </TabPanel>
                <TabPanel>
                    <OrderTap items={desserts}></OrderTap>
                </TabPanel>

                <TabPanel>
                    <OrderTap items={drinks}></OrderTap>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default Order;