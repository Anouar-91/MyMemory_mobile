import { Box, Button, Center, Text } from 'native-base'
import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import InputHookForm from '../components/basics/InputHookForm'
import { StyleSheet } from 'react-native'
import MyButton from '../components/basics/buttonSecondary'
import enWordApi from '../api/enWordApi'
import { useMutation, useQueryClient } from 'react-query'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import ToastBottom from '../components/toastBottom'

const AddEnWordScreen = ({ navigation }) => {
    const queryClient = useQueryClient();

    const [descriptionEnWord, setDescriptionEnWord] = useState(false)
    const [descriptionFrWord, setDescriptionFrWord] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()


    const onSubmit = (data) => {
        console.log(data)
        addEnWordMutation.mutate(data)
    }
    const addEnWordMutation = useMutation(
        (data) => enWordApi.post(data),
        {
            onSuccess: (data) => {
                console.log(data);
                if (data.id) {
                    queryClient.invalidateQueries('enWords')
                    navigation.navigate("listWordScreen")
                    Toast.show({
                        type: 'success',
                        text1: 'Ajouté avec succès !',
                        position: 'bottom',

                    });
                } else if (data.code == "401") {
                    Toast.show({
                        type: 'error',
                        text1: 'Identifiants invalide !',
                        position: 'top',

                    });
                } else if (data["hydra:description"] == "Already exist") {
                    Toast.show({
                        type: 'error',
                        text1: 'Already exist!',
                        position: "bottom"

                    });
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        position: "bottom"
                    });
                }
            },
            onError: (error) => {
                alert(
                    "Nous sommes navré, mais l'application a rencontré un problème !"
                );
            },
        }
    );

    return (
        <>


            <Box style={styles.container}>
                <Center>
                    <Box style={{ width: "90%" }}>
                        <Box style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
                            <Box style={{ width: "86%", marginRight: 10 }}>
                                <InputHookForm required={"true"} isError={errors.content} control={control} name={"content"} placeholder={"English word"} />
                            </Box>
                            {descriptionEnWord ? (
                                <MyButton onClick={() => setDescriptionEnWord(!descriptionEnWord)} color={"secondary"}>-</MyButton>

                            ) : (
                                <MyButton onClick={() => setDescriptionEnWord(!descriptionEnWord)}>+</MyButton>
                            )
                            }
                        </Box>
                        {descriptionEnWord && (

                            <InputHookForm isError={errors.description} control={control} name={"description"} placeholder={"English word description (optional)"} />
                        )}
                        <Box style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                            <Box style={{ width: "86%", marginRight: 10 }}>
                                <InputHookForm required={"true"} isError={errors.wordFr} control={control} name={"wordFr"} placeholder={"Traduction en français"} />
                            </Box>
                            {descriptionFrWord ? (
                                <MyButton onClick={() => setDescriptionFrWord(!descriptionFrWord)} color={"secondary"}>-</MyButton>

                            ) : (
                                <MyButton onClick={() => setDescriptionFrWord(!descriptionFrWord)}>+</MyButton>
                            )
                            }
                        </Box>
                        {descriptionFrWord && (
                            <InputHookForm isError={errors.frDescription} control={control} name={"frDescription"} placeholder={"Description du mot français (optionnel)"} />

                        )}
                    </Box>
                    <MyButton onClick={handleSubmit(onSubmit)} >Save</MyButton>
                </Center>
                <ToastBottom />
            </Box>
        </>


    )
}

export default AddEnWordScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },

})