import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { ActivityCardProps } from "../types";
import { Link } from "expo-router";

const ActivityCard: React.FC<ActivityCardProps> = ({ 
    day, 
    timeOfDay, 
    Kilometer, 
    avgPace, 
    time,
    calories,
    totalKmRan
}) => {
    // Convert all parameters to strings for URL params
    const linkParams = {
        day,
        timeOfDay,
        Kilometer,
        avgPace,
        time,
        calories, // Convert number to string
        totalKmRan,
    };

    console.log("Link Params:", linkParams); // Debug log

    return (
        <Link 
            href={{
                pathname: "/Summary",
                params: linkParams
            }} 
            asChild
        >
            <Pressable style={styles.card}>
                <View style={styles.profileContainer}>
                    <Image 
                        source={{uri: 'https://i.stack.imgur.com/ddX9U.png'}}
                        style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.dayText}>{day}</Text>
                        <Text style={styles.activityText}>{timeOfDay}</Text>
                    </View>
                </View>
                <View style={styles.statsContainer}>
                    <View>
                        <Text style={styles.statValue}>{Kilometer}</Text>
                        <Text style={styles.statLabel}>Kilometer</Text>
                    </View>
                    <View>
                        <Text style={styles.statValue}>{avgPace}</Text>
                        <Text style={styles.statLabel}>AVG. Pace</Text>
                    </View>
                    <View>
                        <Text style={styles.statValue}>{time}</Text>
                        <Text style={styles.statLabel}>Time</Text>
                    </View>
                </View>
                {/* Add display for calories and totalKmRan */}
                <View style={styles.additionalStatsContainer}>
                    <View>
                        <Text style={styles.statValue}>{calories}</Text>
                        <Text style={styles.statLabel}>Calories</Text>
                    </View>
                    <View>
                        <Text style={styles.statValue}>{totalKmRan}</Text>
                        <Text style={styles.statLabel}>Total KM</Text>
                    </View>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginVertical: 8,
        padding: 16,
        elevation: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 12,
    },
    dayText: {
        color: '#070707',
    },
    activityText: {
        color: '#777777',
    },
    statsContainer: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    additionalStatsContainer: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    statValue: {
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#8d8d8d',
    },
});

export default ActivityCard;