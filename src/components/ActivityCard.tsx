import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";

export default function ActivityScreen() {
    return (
        <View style={styles.card}>
            {/*inner container1*/}
            <View style={styles.profileContainer}>
                {/*Image*/}
                <Image 
                    source={{uri: 'https://i.stack.imgur.com/ddX9U.png'}}
                    style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                    {/*Heading*/}
                    <Text style={styles.dayText}>Monday</Text>
                    {/*subHeading*/}
                    <Text style={styles.activityText}>Monday Morning Run</Text>
                </View>
            </View>
            {/*Inner Container 2*/}
            <View style={styles.statsContainer}>
                {/*Kilometer */}
                <View>
                    <Text style={styles.statValue}>0.90</Text>
                    <Text style={styles.statLabel}>Kilometer</Text>
                </View>
                {/*Avg Pace */}
                <View>
                    <Text style={styles.statValue}>12'41</Text>
                    <Text style={styles.statLabel}>AVG. Pace</Text>
                </View>
                {/*Time */}
                <View>
                    <Text style={styles.statValue}>12:00</Text>
                    <Text style={styles.statLabel}>Time</Text>
                </View>
            </View>
        </View>
    );
}

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
    statValue: {
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#8d8d8d',
    },
});