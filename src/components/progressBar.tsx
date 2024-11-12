import React from 'react';
import { View, DimensionValue } from 'react-native';

interface ProgressBarProps {
    prog: DimensionValue;
    innerBorderColor: string;
    containerborderColor: string;
    containerBgr: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    prog,
    innerBorderColor,
    containerborderColor,
    containerBgr
}) => {
    return (
        <View 
            style={{
                borderRadius: 4,
                borderColor: containerborderColor,
                backgroundColor: containerBgr,
                width: '80%',
                borderWidth: 2,
            }}
        >
            <View
                style={{
                    width: prog,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: innerBorderColor,
                    backgroundColor: innerBorderColor,
                }}
            />
        </View>
    );
};


export default ProgressBar;