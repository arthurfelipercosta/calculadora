import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

interface Props {
    valorPeso: string;
    onChangePeso: (text: string) => void;
    onAdicionar: () => void;
}

export function Footer({ valorPeso, onChangePeso, onAdicionar }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputPeso}
                value={valorPeso}
                onChangeText={onChangePeso}
                placeholder="0.000"
                placeholderTextColor="#999"
                keyboardType="numeric"
                selectTextOnFocus={true}
                onSubmitEditing={onAdicionar}
            />

            <TouchableOpacity style={styles.btnAdd} onPress={onAdicionar}>
                <Text style={styles.btnAddText}>Adicionar peso</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingBottom: 10, // Ajuste para não ficar colado no fundo em alguns aparelhos
    },
    inputPeso: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 12,
        marginRight: 8,
        borderRadius: 8,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#F9F9F9',
        color: '#333',
    },
    btnAdd: {
        flex: 1.5,
        backgroundColor: '#E53935',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
    },
    btnAddText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});