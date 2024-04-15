// "use client";

// import React, { JSX, useState } from 'react';
// import clsx from 'clsx';
// import Link from 'next/link';
// import { z } from 'zod';
// import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
// import { InputMask } from '@/app/6_shared/ui/FormFields/InputMask';
// import { registerAction } from '../lib/actions';
// import { Input } from '@/app/6_shared/ui/FormFields/Input';
// import { InputPassword } from '@/app/6_shared/ui/FormFields/InputPassword';


// type InitialState = {
//     errors: {
//         firstName?: string[];
//         lastName?: string[];
//         phone?: string[];
//         email?: string[];
//         password?: string[];
//         confirmPassword?: string[];
//     }
// }

// const RegisterFormSchema = z.object({
//     firstName: z.coerce.string().min(2, {
//         message: 'Имя должно быть не меньше 2 символов'
//     }),
//     lastName: z.coerce.string().min(2, {
//         message: 'Фамилия должна быть не меньше 2 символов'
//     }),
//     phone: z.coerce.string().min(14, {
//         message: 'Номер слишком короткий'
//     }),
//     email: z.coerce.string({
//         required_error: 'Введите ваш E-Mail'
//     }).email('Неверный E-Mail'),
//     password: z.coerce
//         .string()
//         .min(8, "Пароль должен быть не меньше 8 символов.")
//         .refine(value => /[a-zA-Z0-9]/.test(value ?? ""), 'Пароль должен быть только из латинских символов и чисел')
//         .refine(value => /[0-9]/.test(value ?? ""), 'Пароль должен иметь как минимум 1 число')
//         .refine(value => /[a-z]/.test(value ?? ""), 'Пароль должен иметь как минимум 1 маленькую букву')
//         .refine(value => /[A-Z]/.test(value ?? ""), 'Пароль должен иметь как минимум 1 большую букву')
//         .refine(value => /[#|$|%|*]/.test(value ?? ""), 'Пароль должен иметь как минимум 1 спецсимвол: # $ % *'),
//     confirmPassword: z.string(),

// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Пароли не совпадают",
//     path: ["confirmPassword"]
// });


// // pass 233dE#sdf
// export function RegisterForm(): JSX.Element {
//     const [state, setState] = useState<InitialState>({ errors: {} });
//     const [registerError, setRegisterError] = useState(false);

//     const submitHandler = async (formData: FormData) => {
//         const rawFormData = Object.fromEntries(formData.entries());

//         const validatedFields = RegisterFormSchema.safeParse({
//             firstName: rawFormData.firstName,
//             lastName: rawFormData.lastName,
//             phone: rawFormData.phone.toString().replace(/[\s|_]/ig, ""),
//             email: rawFormData.email,
//             password: rawFormData.password,
//             confirmPassword: rawFormData.confirmPassword
//         });

//         if (!validatedFields.success) {
//             setState({
//                 errors: validatedFields.error.flatten().fieldErrors
//             })
//             return;
//         }

//         const { confirmPassword, ...data } = validatedFields.data;

//         const result = await registerAction(data);

//         if(result?.resultCode === 1) {
//             setRegisterError(true);
//         }
//     }

//     return (
//         <form
//             action={submitHandler}
//             className='mt-4'
//         >
//             <div className='outline-dashed outline-1 outline-slate-300 py-8 px-4 mt-8 md:max-w-[800px] md:p-9'>
//                 <div className='prose text-[12px] md:text-[16px]'>
//                     <p>Зарегистрируйтесь, чтобы использовать все возможности личного кабинета: отслеживание заказов, настройку подписки, связи с социальными сетями и другие.</p>
//                     <p>Уже зарегистрированы? <Link href="/authorization">Войдите в личный кабинет.</Link></p>
//                     <p>Мы никогда и ни при каких условиях не разглашаем личные данные клиентов. Контактная информация будет использована только для оформления заказов и более удобной работы с сайтом.</p>
//                 </div>

//                 <div className='flex flex-col gap-5 mt-6'>
//                     <label className='block'>
//                         <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                             Имя
//                             <span className='text-rose-500'>*</span>
//                         </span>
//                         <Input
//                             type='text'
//                             className={clsx(
//                                 'md:max-w-[485px]',
//                                 {
//                                     'border-rose-500': state.errors?.firstName
//                                 }
//                             )}
//                             name='firstName'
//                             required
//                         />
//                         {state.errors?.firstName && <div className='text-rose-500 text-[12px]'>{...state.errors?.firstName}</div>}
//                     </label>
//                     <label className='block'>
//                         <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                             Фамилия
//                             <span className='text-rose-500'>*</span>
//                         </span>
//                         <Input
//                             type='text'
//                             className={clsx(
//                                 'md:max-w-[485px]',
//                                 {
//                                     'border-rose-500': state.errors?.lastName
//                                 }
//                             )}
//                             name='lastName'
//                             required
//                         />
//                         {state.errors?.lastName && <div className='text-rose-500 text-[12px]'>{...state.errors?.lastName}</div>}
//                     </label>
//                     <label className='block'>
//                         <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                             Телефон
//                             <span className='text-rose-500'>*</span>
//                         </span>
//                         <InputMask
//                             mask="380(99) 999 99 99"
//                             type='text'
//                             className={clsx(
//                                 'md:max-w-[485px]',
//                                 {
//                                     'border-rose-500': state.errors?.phone
//                                 }
//                             )}
//                             name='phone'
//                             required
//                         />
//                         {state.errors?.phone && <div className='text-rose-500 text-[12px]'>{...state.errors?.phone}</div>}
//                     </label>
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
//                                     'border-rose-500': registerError || state.errors?.email
//                                 }
//                             )}
//                             name='email'
//                             required
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
//                                         'border-rose-500': state.errors?.password
//                                     }
//                                 )}
//                                 name='password'
//                                 required
//                             />
//                         </div>
//                         {state.errors?.password &&
//                             state.errors?.password.map((error, i) =>
//                                 <div key={i} className='text-rose-500 text-[12px]'>
//                                     {error}
//                                 </div>
//                             )
//                         }
//                     </label>
//                     <label className='block'>
//                         <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                             Повторите пароль
//                             <span className='text-rose-500'>*</span>
//                         </span>
//                         <div className='md:max-w-[485px]'>
//                             <InputPassword
//                                 className={clsx(
//                                     {
//                                         'border-rose-500': state.errors?.confirmPassword
//                                     }
//                                 )}
//                                 name='confirmPassword'
//                                 required
//                             />
//                         </div>
//                         {state.errors?.confirmPassword && <div className='text-rose-500 text-[12px]'>{...state.errors?.confirmPassword}</div>}
//                     </label>
//                     <SubmitButton className='h-11 text-[16px] md:max-w-[485px] md:self-start'>
//                         Зарегистрироваться
//                     </SubmitButton>
//                     {registerError &&
//                         <div className='text-rose-500 text-[14px]'>
//                             Пользователя с таким E-mail уже существует!
//                         </div>
//                     }
//                 </div>
//             </div>
//         </form>
//     );
// }