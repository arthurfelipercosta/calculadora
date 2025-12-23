import { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Peso } from '../types/Peso';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PesoItem } from '../components/PesoItem';
import { PesoModal } from '../components/PesoModal';
import { ConfirmModal } from '../components/ConfirmModal';

export function Home() {
    const [pesos, setPesos] = useState<Peso[]>([]);
    const [modal, setModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState<'delete' | 'clearAll' | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const qtdItens = pesos.reduce((total, item) => total + item.quantidade, 0);
    const pesoTotal = pesos.reduce(
        (total, item) => total + item.pesoUnit * item.quantidade,
        0,
    );

    const handleAddPeso = () => {
        setModal(true);
    };

    const handleOnPeso = () => {
        setModal(true);
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const handleConfirmPeso = (pesoValor: number) => {
        const novoPeso: Peso = {
            id: Date.now().toString(),
            pesoUnit: pesoValor,
            quantidade: 1,
        };

        setPesos([...pesos, novoPeso]);
        setModal(false);
    };

    const handleIncrement = (id: string) => {
        setPesos(prevPesos =>
            prevPesos.map(peso =>
                peso.id === id ? { ...peso, quantidade: peso.quantidade + 1 } : peso
            )
        );
    };

    const handleDecrement = (id: string) => {
        setPesos(prevPesos =>
            prevPesos.map(peso =>
                peso.id === id && peso.quantidade > 0
                    ? { ...peso, quantidade: peso.quantidade - 1 }
                    : peso
            )
        );
    };

    const handleDeletePeso = (id: string) => {
        setDeleteId(id);
        setConfirmAction('delete');
        setConfirmModal(true);
    };

    const handleClearAll = () => {
        setConfirmAction('clearAll');
        setConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (confirmAction === 'delete' && deleteId) {
            setPesos(prevPesos => prevPesos.filter(peso => peso.id !== deleteId));
        } else if (confirmAction === 'clearAll') {
            setPesos([]);
        }
        setConfirmModal(false);
        setConfirmAction(null);
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setConfirmModal(false);
        setConfirmAction(null);
        setDeleteId(null);
    };

    const handleUpdateQuantidade = (id: string, novaQuantidade: number) => {
        setPesos(prevPesos =>
            prevPesos.map(peso =>
                peso.id === id ? { ...peso, quantidade: novaQuantidade } : peso
            )
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title={"Calculadora de Conferência"} qtdItens={qtdItens} pesoTotal={pesoTotal} />
            <View style={styles.content}>
                {pesos.length === 0 ? (
                    <Text style={styles.emptyListText}>Nenhum peso adicionado ainda.</Text>
                ) : (
                    <>
                        <FlatList
                            data={pesos}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <PesoItem
                                    item={item}
                                    onIncrement={() => handleIncrement(item.id)}
                                    onDecrement={() => handleDecrement(item.id)}
                                    onDelete={() => handleDeletePeso(item.id)}
                                    onUpdateQuantidade={(novaQtd) => handleUpdateQuantidade(item.id, novaQtd)}
                                    onRequestDelete={() => handleDeletePeso(item.id)}
                                />
                            )}
                            contentContainerStyle={styles.flatListContent}
                        />
                        <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
                            <Text style={styles.clearAllButtonText}>Limpar Tudo</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <Footer onPeso={handleOnPeso} onAdicionar={handleAddPeso} />
            <PesoModal
                visible={modal}
                onClose={handleModalClose}
                onConfirm={handleConfirmPeso}
            />
            <ConfirmModal
                visible={confirmModal}
                title={confirmAction === 'delete' ? 'Excluir Peso' : 'Limpar Tudo'}
                message={
                    confirmAction === 'delete'
                        ? 'Tem certeza que deseja excluir este peso?'
                        : 'Tem certeza que deseja excluir todos os pesos?'
                }
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Excluir"
                isDangerous
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    content: {
        flex: 1,
        padding: 10,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    flatListContent: {
        paddingBottom: 10,
    },
    clearAllButton: {
        backgroundColor: '#FF3B30',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    clearAllButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});