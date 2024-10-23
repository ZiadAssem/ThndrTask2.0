import { StyleSheet, Text, View } from "react-native";

interface AltTextComponentProps {
    ticker: string;
}
// This component is used to display the ticker of a stock when the stock image is not available
export const AltTextComponent: React.FC<AltTextComponentProps> = ({ ticker }) => {
    return (
        <View style={styles.textBox}>
            <Text style={styles.altText}>{ticker}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    altText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '300'

    },
    textBox: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#3b3b3b',
        padding: 10,
        marginVertical: 10,      

    },
});