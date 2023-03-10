import React, { useRef, useState } from 'react';
import { RowBlock, RowBlockUpper } from "../components/PageBlocks";
import InputWithValidation, {TEXT, EMAIL, PASSWORD, NUMBER} from "../components/InputWithValidation";
import {
    isContainsSpace,
    isEmail, isLen,
    isMinMaxLen,
    isNickname,
    isNotBlank,
    isPassword, isUint64
} from "../utils/dataValidators";
import { Link } from "react-router-dom";
import { signupWithoutCodeMutation } from "../graphql/graphql";
import Modals from "../components/Modals";
import {toast, Toaster} from "react-hot-toast";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default function Signup() {
    const [nicknameValue, setNicknameValue] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const inputNicknameRef = useRef<HTMLInputElement>(null);
    const handleNicknameChange = (value: string, error: string) => {
        setNicknameValue(value);
        setNicknameError(error);
    };

    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState("");
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const handleEmailChange = (value: string, error: string) => {
        setEmailValue(value);
        setEmailError(error);
    };

    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const handlePasswordChange = (value: string, error: string) => {
        setPasswordValue(value);
        setPasswordError(error);
    };

    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const inputRepeatPasswordRef = useRef<HTMLInputElement>(null);
    const handleRepeatPasswordChange = (value: string, error: string) => {
        setRepeatPasswordValue(value);
        setRepeatPasswordError(error);
    };

    const [codeValue, setCodeValue] = useState("");
    const [codeError, setCodeError] = useState("");
    const inputCodeRef = useRef<HTMLInputElement>(null);
    const handleCodeChange = (value: string, error: string) => {
        setCodeValue(value);
        setCodeError(error);
    };

    const [show, setShow] = useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    function handleSignupWithoutCodeClick() {
        setIsSubmitting(true);
        setNicknameError("");
        setEmailError("");
        setPasswordError("");
        setRepeatPasswordError("");

        inputNicknameRef.current?.focus();
        inputNicknameRef.current?.blur();
        inputEmailRef.current?.focus();
        inputEmailRef.current?.blur();
        inputPasswordRef.current?.focus();
        inputPasswordRef.current?.blur();
        inputRepeatPasswordRef.current?.focus();
        inputRepeatPasswordRef.current?.blur();

        if (nicknameValue === "" || emailValue === "" || passwordValue === "" || repeatPasswordValue === "") {
            toast.error("?????????????????? ?????? ???????? ?????????? ????????????")
            setIsSubmitting(false);
            return;
        }

        if (nicknameError != "" || emailError != "" || passwordError != "" || repeatPasswordError != "") {
            toast.error("?????????????? ???????????????????? ????????????")
            setIsSubmitting(false);
            return;
        }

        if (passwordValue !== repeatPasswordValue) {
            toast.error("???????????? ???? ??????????????????")
            setPasswordError("???????????? ???? ??????????????????");
            setRepeatPasswordError("???????????? ???? ??????????????????");
            setIsSubmitting(false);
            return;
        }

        toast.promise(
            signupWithoutCodeMutation({
                nickname: nicknameValue,
                email: emailValue,
                password: passwordValue
            }).then(data => {
                console.log('Mutation result2:', typeof data + ": 11" + data + '11');
                if (data == 'ApolloError: this nickname is already in use') {
                    setNicknameError('?????????????????? ?????? ????????????????????????');
                    setIsSubmitting(false);
                } else if (data == 'ApolloError: email: the email domain is not exist') {
                    setEmailError('?????????? ?????????????????????? ?????????? ???? ????????????????????');
                    setIsSubmitting(false);
                } else if (data == 'ApolloError: this email is already in use') {
                    setEmailError('?????????????????????? ?????????? ?????? ????????????????????????');
                    setIsSubmitting(false);
                } else if (data == true) {
                    setCodeValue("");
                    setCodeError("");
                    setShow(true);
                    setIsSubmitting(false);
                }
            }).catch(error => {
                console.log(error);
                setIsSubmitting(false);
            }),
            {
                loading: '????????????????????????...',
                success: <b>???????? ?????????????????????? ??????????!</b>,
                error: () => {
                    setIsSubmitting(false); console.log("d")
                    return <b>???????????? ??????????????.</b>
                },
            }
        );
    }

    function handleSignupWithCodeClick() {
        setNicknameError("");
        if (nicknameValue === "" || emailValue === "" || passwordValue === "" || repeatPasswordValue === "") {
            toast.error("?????????????????? ?????? ???????? ?????????? ????????????")
            setIsSubmitting(false);
            return;
        }

        if (nicknameError !== "" || emailError !== "" || passwordError !== "" || repeatPasswordError !== "") {
            toast.error("?????????????? ???????????????????? ????????????")
            setIsSubmitting(false);
            return;
        }

        inputCodeRef.current?.focus();
        inputCodeRef.current?.blur();

        signupWithoutCodeMutation({
            nickname: nicknameValue,
            email: emailValue,
            password: passwordValue
        }).then(data => {
            console.log('Mutation resultd:', typeof data);
            setCodeValue("");
            setCodeError("");
            setShow(true);
        }).catch(error => {
            console.error('Mutation error:', error);
            if (error === 'email: the email domain is not exist') {
                setEmailError('?????????? ?????????????????????? ?????????? ???? ????????????????????');
                return;
            }
        });
    }

    // dwwda##ddeer444D
    return (
        <div className="mx-auto max-w-4xl">
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="text-3xl font-bold mb-6 uppercase select-none">??????????????????????</h3>
                </div>
            </RowBlock>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"??????????????????"}
                    placeholder={"ivanchik"}
                    id={"field-nickname"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 32), isContainsSpace, isNickname]}
                    value={nicknameValue}
                    error={nicknameError}
                    onChange={handleNicknameChange}
                    inputRef={inputNicknameRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"?????????????????????? ??????????"}
                    placeholder={"ivan.ivanov@mail.ru"}
                    id={"field-email"}
                    type={EMAIL}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isEmail]}
                    value={emailValue}
                    error={emailError}
                    onChange={handleEmailChange}
                    inputRef={inputEmailRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    addToClassName="sm:w-1/2"
                    nameField={"????????????"}
                    placeholder={"********"}
                    id={"field-password"}
                    type={PASSWORD}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isPassword]}
                    value={passwordValue}
                    error={passwordError}
                    onChange={handlePasswordChange}
                    inputRef={inputPasswordRef}
                    insertSpace={false} />

                <InputWithValidation
                    addToClassName="sm:w-1/2"
                    nameField={"?????????????????? ????????????"}
                    placeholder={"********"}
                    id={"field-repeat-password"}
                    type={PASSWORD}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isPassword]}
                    value={repeatPasswordValue}
                    error={repeatPasswordError}
                    onChange={handleRepeatPasswordChange}
                    inputRef={inputRepeatPasswordRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlock>
                <div className="text-center w-full mt-4">
                    <button className="btn-classic-frame select-none px-6 py-2.5 text-xl uppercase"
                            type="submit"
                            onClick={handleSignupWithoutCodeClick}
                            disabled={isSubmitting}>????????????????????????????????????
                    </button>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center select-none">
                    <p className="leading-tight mx-1">???????? ???????????????</p>
                    <Link to="/login" className="btn-usual-link">??????????????!</Link>
                </div>
            </RowBlock>

            <Modals onShow={show} setShow={setShow} canLeave={true} title="??????????????????????">
                <RowBlockUpper>
                    <InputWithValidation
                        nameField={"?????? ?????????????????????????? ??????????"}
                        placeholder={"123456"}
                        id={"field-confirmation-code"}
                        type={NUMBER}
                        maxLength={6}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isNotBlank, isLen(6), isContainsSpace, isUint64]}
                        value={codeValue}
                        error={codeError}
                        onChange={handleCodeChange}
                        inputRef={inputCodeRef}
                        insertSpace={false} />
                </RowBlockUpper>

                <RowBlockUpper>
                    <button className="btn-classic block lg:inline-block lg:mt-0 ml-4 mr-6" onClick={handleSignupWithCodeClick}>
                        ??????????????????????
                    </button>
                </RowBlockUpper>
            </Modals>
        </div>
    )
}