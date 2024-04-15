// "use client";

// import React, { JSX, useEffect, useState } from 'react';
// import clsx from 'clsx';
// import { UserType } from '@/app/5_entities/users';
// import { z } from 'zod';
// import { Input } from '@/app/6_shared/ui/FormFields/Input';
// import { InputMask } from '@/app/6_shared/ui/FormFields/InputMask';
// import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
// import { useFormStatus } from 'react-dom';
// import { Spinner } from '@/app/6_shared/ui/Spinner';
// import { updateMeAction } from '../lib/actions';


// const FormSchema = z.object({
//     firstName: z.coerce.string().min(2, {
//         message: 'Имя должно быть не меньше 2 символов'
//     }),
//     lastName: z.coerce.string().min(2, {
//         message: 'Фамилия должна быть не меньше 2 символов'
//     }),
//     phone: z.coerce.string()
//         .min(12, 'Номер слишком короткий, формат номера должен быть 380999999999')
//         .max(12, 'Номер слишком длинный, формат номера должен быть 380999999999')
// });

// type InitialState = {
//     errors: {
//         firstName?: string[];
//         lastName?: string[];
//         phone?: string[];
//     }
// }

// interface PersonalInformationFormProps {
//     personalInfo: UserType;
// }

// export function PersonalInformationForm({ personalInfo }: PersonalInformationFormProps): JSX.Element {
//     const [state, setState] = useState<InitialState>({ errors: {} });

//     const submitHandler = async (formData: FormData) => {
//         const rawFormData = Object.fromEntries(formData.entries());

//         const validatedFields = FormSchema.safeParse({
//             firstName: rawFormData.firstName,
//             lastName: rawFormData.lastName,
//             phone: rawFormData.phone.toString().trim().replace(/[\(\)]/g, '')
//         });

//         if (!validatedFields.success) {
//             setState({
//                 errors: validatedFields.error.flatten().fieldErrors
//             })
//             return;
//         }

//         await updateMeAction({
//             firstName: validatedFields.data.firstName,
//             lastName: validatedFields.data.lastName,
//             phone: validatedFields.data.phone,
//         })

//         setState({ errors: {} })
//     }

//     return (
//         <form action={submitHandler}
//             className='flex flex-col gap-5'
//         >
//             <ModeField
//                 label='Имя'
//                 name='firstName'
//                 errors={state.errors?.firstName}
//                 defaultValue={personalInfo.firstName as string}
//             />
//             <ModeField
//                 label='Фамилия'
//                 name='lastName'
//                 errors={state.errors?.lastName}
//                 defaultValue={personalInfo.lastName as string}
//             />
//             <ModeField
//                 label='Телефон'
//                 name='phone'
//                 errors={state.errors?.phone}
//                 defaultValue={personalInfo.phone as string}
//                 phone={true}
//             />
//             <label className='block pointer-events-none'>
//                 <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                     E-mail
//                 </span>
//                 <Input
//                     type='email'
//                     className={clsx(
//                         'md:max-w-[485px]',
//                     )}
//                     name='email'
//                     defaultValue={personalInfo.email as string}
//                 />
//             </label>
//         </form>
//     );
// }

// interface FieldProps {
//     defaultValue: string;
//     errors?: string[];
//     name: string;
//     label: string;
//     phone?: boolean;
// }

// function ModeField({ defaultValue, label, name, errors, phone }: FieldProps): JSX.Element {
//     const [isMode, setIsMode] = useState(false);
//     const { pending } = useFormStatus();

//     useEffect(() => {
//         if(!pending) {
//             setIsMode(false);
//         }
//     }, [pending])

//     return (
//         <label
//             className={clsx(
//                 'block md:max-w-[585px]',
//                 {
//                     'pointer-events-none': !isMode
//                 }
//             )}
//         >
//             <span className='block text-dark leading-normal -tracking-wide mb-1'>
//                 {label}
//             </span>
//             <div className='relative'>
//                 <Input
//                     ref={(input) => {
//                         if (input) {
//                             if (isMode) {
//                                 input.focus();
//                                 input.selectionEnd = input.value.length
//                             } else {
//                                 input.blur();
//                             }
//                         }
//                     }}
//                     type='text'
//                     className={clsx(
//                         ' pr-20',
//                         {
//                             'border-rose-500': errors
//                         }
//                     )}
//                     name={name}
//                     defaultValue={defaultValue}
//                     onChange={(e) => {
//                         if(!phone) return;
//                         e.target.value = e.target.value.replace(/[^0-9]/g, '');
//                     }}
//                 />
//                 <div className="absolute top-1/2 right-2 flex gap-1 -translate-y-1/2">
//                     {isMode
//                         ? <>
//                             <button
//                                 className={clsx(
//                                     'size-7 p-1 flex items-center justify-center pointer-events-auto  rounded',
//                                     'text-white bg-green-700 transition hover:bg-green-600', 
//                                     {
//                                         'cursor-default pointer-events-none': pending
//                                     }
//                                 )}
//                             >
//                                 {pending
//                                     ? <Spinner className='w-4/5 h-auto' />
//                                     : <CheckIcon className='h-full w-auto' />
//                                 }
//                             </button>
//                             <button
//                                 type='button'
//                                 className={clsx(
//                                     'size-7 p-1 flex items-center justify-center pointer-events-auto  rounded',
//                                     'text-white bg-red-700 transition hover:bg-red-600'
//                                 )}
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     e.stopPropagation();
//                                     setIsMode(false);
//                                 }}
//                             >
//                                 <XMarkIcon className='h-full w-auto' />
//                             </button>

//                         </>
//                         : <button
//                             type='button'
//                             className={clsx(
//                                 'size-7 p-1 flex items-center justify-center pointer-events-auto  rounded',
//                                 'text-white bg-third transition hover:bg-third-light'
//                             )}
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 setIsMode(true);
//                             }}
//                         >
//                             <PencilIcon className='h-full w-auto' />
//                         </button>
//                     }
//                 </div>
//             </div>
//             {errors && <div className='text-rose-500 text-[12px]'>{...errors}</div>}
//         </label>
//     );
// }