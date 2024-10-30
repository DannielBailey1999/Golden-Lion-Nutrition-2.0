import { Text, View, StyleSheet, Image, FlatList} from "react-native";
import React from "react";
import ActivityCard from "@/src/components/ActivityCard";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
  type ItemProps = {title: string};
  
  const Item = ({title}: ItemProps) => (
    <View>
      <Text >{title}</Text>
    </View>
  );

export default function ActivityScreen () {
    
    return(
        <View style={{paddingHorizontal: 12}}>
            {/*card 1*/}
            {/* <ActivityCard /> */}

             <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            />

        </View>
    );
};