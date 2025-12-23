import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { Peso } from '../types/Peso';

interface Props {
    item: Peso;
    onIncrement: () => void;
    onDecrement: () => void;
    onDelete: () => void;
    onUpdateQuantidade: (novaQuantidade: number) => void;
    onRequestDelete?: () => void;
}

export function PesoItem({
    item,
    onIncrement,
    onDecrement,
    onDelete,
    onUpdateQuantidade,
    onRequestDelete,
}: Props) {
    const [editingQtd, setEditingQtd] = useState(false);
    const [tempQtd, setTempQtd] = useState(item.quantidade.toString());
    const inputRef = useRef<TextInput>(null);
    const total = item.pesoUnit * item.quantidade;

    const handleEditQuantidade = () => {
        setEditingQtd(true);
        setTempQtd(item.quantidade.toString());
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    const handleConfirmQuantidade = () => {
        const novaQtd = parseInt(tempQtd, 10);
        if (!isNaN(novaQtd) && novaQtd > 0) {
            onUpdateQuantidade(novaQtd);
        }
        setEditingQtd(false);
    };

    const handleCancelEdit = () => {
        setEditingQtd(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.peso}>{item.pesoUnit.toFixed(3)}</Text>
            <View style={styles.qtd}>
                {item.quantidade === 1 ? (
                    <TouchableOpacity onPress={onRequestDelete}>
                        <MaterialIcons name="highlight-remove" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={onDecrement}>
                        <MaterialIcons name="remove" size={24} color="#333" />
                    </TouchableOpacity>
                )}

                {editingQtd ? (
                    <TextInput
                        ref={inputRef}
                        style={styles.qtdInput}
                        value={tempQtd}
                        onChangeText={setTempQtd}
                        keyboardType="numeric"
                        onSubmitEditing={handleConfirmQuantidade}
                        onBlur={handleConfirmQuantidade}
                    />
                ) : (
                    <TouchableOpacity onPress={handleEditQuantidade}>
                        <Text style={styles.qtdValue}>{item.quantidade}</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={onIncrement}>
                    <MaterialIcons name="add" size={24} color="#333" />
                </TouchableOpacity>
            </View>
            <Text style={styles.total}>{total.toFixed(3)}</Text>
            <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
                <MaterialIcons name="delete" size={24} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFF',
        marginBottom: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    peso: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtd: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    qtdValue: {
        fontSize: 16,
        width: 30,
        textAlign: 'center',
        fontWeight: '600',
    },
    qtdInput: {
        fontSize: 16,
        width: 30,
        textAlign: 'center',
        fontWeight: '600',
        borderBottomWidth: 2,
        borderBottomColor: '#007AFF',
        paddingVertical: 2,
    },
    total: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteBtn: {
        paddingLeft: 10,
    },
});