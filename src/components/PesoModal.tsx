import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState, useRef, useEffect } from 'react';

interface Props {
    visible: boolean;
    onClose: () => void;
    onConfirm: (peso: number) => void;
}

export function PesoModal({ visible, onClose, onConfirm }: Props) {
    const [valor, setValor] = useState('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (visible && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [visible]);

    function formatarValor(texto: string): string {
        // Remove tudo que não é número
        const apenasNumeros = texto.replace(/\D/g, '');

        if (apenasNumeros === '') {
            return '';
        }

        // Garante sempre 4 dígitos (com zeros à esquerda se necessário)
        const padronizado = apenasNumeros.padStart(4, '0');

        // Formata como XXX.X (3 dígitos antes do ponto, 1 depois)
        const inteira = padronizado.slice(0, -3);
        const decimal = padronizado.slice(-3);

        // Remove zeros da esquerda da parte inteira, mantendo pelo menos um
        const inteiraSemZeros = inteira.replace(/^0+/, '') || '0';

        return `${inteiraSemZeros}.${decimal}`;
    }

    function handleChangeText(texto: string) {
        const formatado = formatarValor(texto);
        setValor(formatado);
    }

    function confirmar() {
        const peso = parseFloat(valor);
        if (!isNaN(peso) && peso > 0) {
            onConfirm(peso);
            setValor('');
        }
    }

    function handleClose() {
        setValor('');
        onClose();
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Digite o peso</Text>
                    <TextInput
                        ref={inputRef}
                        keyboardType="numeric"
                        value={valor}
                        onChangeText={handleChangeText}
                        placeholder="0.000"
                        style={styles.input}
                        maxLength={7}
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={handleClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirmar}>
                            <Text style={styles.buttonTextOk}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#FFF',
        width: '80%',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
    },
    input: {
        borderBottomWidth: 1,
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#666',
        padding: 10,
    },
    buttonTextOk: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
        padding: 10,
    },
});