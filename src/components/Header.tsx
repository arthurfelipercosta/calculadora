import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    qtdItens: number;
    pesoTotal: number;
    title?: string;
    precoKg: string;
    onChangePrecoKg: (text: string) => void;
    showPreco: boolean;
    onTogglePreco: () => void;
}

export function Header({ qtdItens, pesoTotal, title, precoKg, onChangePrecoKg, showPreco, onTogglePreco }: Props) {
    const valorTotal = pesoTotal * (parseFloat(precoKg.replace(',', '.')) || 0);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                {title && <Text style={styles.title}>{title}</Text>}
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.box}>
                    <Text style={styles.label}>QTD DE ITENS</Text>
                    <Text style={styles.value}>{qtdItens}</Text>
                </View>
                <TouchableOpacity onPress={onTogglePreco} style={styles.btnToggle}>
                    <MaterialIcons
                        name={showPreco ? "visibility" : "visibility-off"}
                        size={24}
                        color="#666"
                    />
                </TouchableOpacity>
                <View style={styles.box}>
                    <Text style={styles.label}>PESO TOTAL</Text>
                    <Text style={styles.value}>{pesoTotal.toFixed(3)}</Text>
                </View>
            </View>

            {showPreco && (
                <View style={styles.precoArea}>
                    <View style={styles.precoBox}>
                        <Text style={styles.precoLabel}>R$ / Kg</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.currencyPrefix}>R$</Text>
                            <TextInput
                                style={styles.precoInput}
                                value={precoKg}
                                onChangeText={onChangePrecoKg}
                                keyboardType="numeric"
                                placeholder="0.00"
                                placeholderTextColor="#999"
                                selectTextOnFocus={true}
                            />
                        </View>
                    </View>
                    <View style={styles.totalFinanceiroBox}>
                        <Text style={styles.precoLabel}>VALOR TOTAL</Text>
                        <Text style={styles.totalFinanceiroValue}>
                            R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
        flex: 1,
    },
    btnToggle: {
        padding: 5,
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
        fontSize: 11,
        color: '#888',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    precoArea: {
        flexDirection: 'row',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        alignItems: 'center',
    },
    precoBox: {
        flex: 1,
    },
    precoLabel: {
        fontSize: 10,
        color: '#888',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    precoInput: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        minWidth: 60,
        padding: 0,
    },
    totalFinanceiroBox: {
        flex: 1.5,
        alignItems: 'flex-end',
    },
    totalFinanceiroValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#28a745',
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F7FF', // Fundo levemente azulado
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 2,
    },
    currencyPrefix: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF',
        marginRight: 4,
    },
});