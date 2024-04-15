// "use client";

// import React, { JSX, useState } from 'react';
// import clsx from 'clsx';
// import Link from 'next/link';
// import { z } from 'zod';
// import { loginAction, setAuthCookyAction } from '@/app/5_entities/users';
// import { useRouter } from 'next/navigation';
// import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
// import { Input } from '@/app/6_shared/ui/FormFields/Input';
// import { InputPassword } from '@/app/6_shared/ui/FormFields/InputPassword';


// interface AuthFormProps {

// }

// type InitialState = {
//     errors: {
//         email?: string[];
//         password?: string[];
//     }
// }

// const LoginFormSchema = z.object({
//     email: z.coerce.string({
//         required_error: 'Введите ваш E-Mail'
//     }).email('Неверный E-Mail'),
//     password: z.coerce.string().min(1, {
//         message: 'Введите ваш пароль'
//     })
// }).required();

// export function AuthForm({ }: AuthFormProps): JSX.Element {
//     const [state, setState] = useState<InitialState>({ errors: {} });
//     const [loginError, setLoginError] = useState(false);
//     const router = useRouter();


//     const submitHandler = async (formData: FormData) => {
//         const rawFormData = Object.fromEntries(formData.entries());
//         const validatedFields = LoginFormSchema.safeParse({
//             email: rawFormData.email,
//             password: rawFormData.password
//         });

//         if (!validatedFields.success) {
//             setState({
//                 errors: validatedFields.error.flatten().fieldErrors
//             })
//             return;
//         }
//         const result = await loginAction(validatedFields.data);

//         if (!result) {
//             setLoginError(true);
//             setState({ errors: {} });
//             return;
//         }

//         localStorage.setItem('user-jwt', result);
//         await setAuthCookyAction({
//             jwtToken: result,
//             isIdentified: true
//         });
//         router.push('/cabinet');
//     }

//     return (
//         <form
//             action={submitHandler}
//             className='mt-4'
//         >
//             <div className='outline-dashed outline-1 outline-slate-300 py-8 px-4 mt-8 md:max-w-[800px] md:p-9'>
//                 <div className='prose text-[12px] md:text-[16px]'>
//                     <p>Авторизируйтесь чтобы использовать весь функционал магазина.</p>
//                     <p>Ещё не зарегистрированы? <Link href="/registration">Зарегистрироваться.</Link></p>
//                 </div>

//                 <div className='flex flex-col gap-5 mt-6'>
//                     <label className='block'>
//                         <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                             E-mail
//                             <span className='text-rose-500'>*</span>
//                         </span>
//                         <Input
//                             type='email'
//                             className={clsx(
//                                 'md:max-w-[485px]',
//                                 {
//                                     'border-rose-500': loginError || state.errors?.email
//                                 }
//                             )}
//                             name='email'
//                         />
//                         {state.errors?.email && <div className='text-rose-500 text-[12px]'>{...state.errors?.email}</div>}
//                     </label>
//                     <label className='block'>
//                         <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                             Пароль
//                             <span className='text-rose-500'>*</span>
//                         </span>
//                         <div className='md:max-w-[485px]'>
//                             <InputPassword
//                                 className={clsx(
//                                     {
//                                         'border-rose-500': loginError || state.errors?.password
//                                     }
//                                 )}
//                                 name='password'
//                             />
//                         </div>
//                         {state.errors?.password && <div className='text-rose-500 text-[12px]'>{...state.errors?.password}</div>}
//                     </label>
//                     <SubmitButton className='h-11 text-[16px] md:max-w-[485px] md:self-start'>
//                         Войти
//                     </SubmitButton>
//                     {loginError &&
//                         <div className='text-rose-500 text-[14px]'>
//                             Неверный пароль или пользователя с таким E-mail не существует
//                         </div>
//                     }
//                 </div>
//             </div>
//         </form>
//     );
// }