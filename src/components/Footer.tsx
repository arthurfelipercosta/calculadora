import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    onPeso: () => void;
    onAdicionar: () => void;
}

export function Footer({ onPeso, onAdicionar }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnPeso} onPress={onPeso}>
                <Text>PESO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnAdd} onPress={onAdicionar}>
                <Text style={{ color: '#FFF' }}>Adicionar peso</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFF',
    },
    btnPeso: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        padding: 12,
        marginRight: 8,
        borderRadius: 8,
    },
    btnAdd: {
        flex: 2,
        backgroundColor: '#E53935',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
    },
});
