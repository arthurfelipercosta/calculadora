import { View, Text, StyleSheet } from 'react-native';

interface Props {
    qtdItens: number;
    pesoTotal: number;
    title?: string;
}

export function Header({ qtdItens, pesoTotal, title }: Props) {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}

            {/* Novo container para as informações ficarem lado a lado */}
            <View style={styles.infoContainer}>
                <View style={styles.box}>
                    <Text style={styles.label}>QTD DE ITENS</Text>
                    <Text style={styles.value}>{qtdItens}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>PESO TOTAL</Text>
                    <Text style={styles.value}>{pesoTotal.toFixed(3)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    value: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
});
