import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import ActivityCard from "@/src/components/ActivityCard";
import { DATA } from "@/src/components/dummyData";
import { ActivityItem, ActivityCardProps } from '@/src/types'

export default function ActivityScreen(): JSX.Element {
    const renderItem = ({ item }: { item: ActivityItem }): JSX.Element => {
        return (
            <ActivityCard
                day={item.day}
                timeOfDay={item.timeOfDay}
                Kilometer={item.Kilometer}
                avgPace={item.avgPace}
                time={item.time}
                calories={item.calories}
                totalKmRan={item.totalKmRan}
            />
        );
    };

    return (
        <View style={{ paddingHorizontal: 12 }}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item: ActivityItem) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}