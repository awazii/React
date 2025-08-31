import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form'
import Loader from './Loader.jsx'
import { CiUser } from "react-icons/ci";
const Form = () => {
    const { register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm();
    const Onsubmit = async (data) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(data);
                resolve();
            }, 3000);
        }).then(() => {
            setTimeout(() => {
                reset();
            }, 3000);
        }).catch((error) => {
            console.error("Error during form submission:", error);
        });
    }
    const password = watch("password");
    const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return (
        <StyledWrapper>
            <div className='form-container flex items-center justify-center h-[80vh]'>
                <form className="form" onSubmit={handleSubmit(Onsubmit)}>
                    <div className="flex-column">
                        <label>Username</label></div>
                    <div className="inputForm">
                        <CiUser className='size-6 ' />
                        <input placeholder="Enter Username" className="input" type="text" {...register("username", {
                            required: { value: true, message: "Username is required" }, minLength: { value: 4, message: "Username must be at least 4 characters long" }, validate: async (value) => {
                                if (value === "admin") {
                                    return "Username cannot be admin";
                                }
                            } 
                        }) } onBlur={() => trigger("username")} />
                    </div>
                    {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>}
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 32 32" height={20}><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" /></g></svg>
                        <input placeholder="Enter your Email" className="input" type="text" {...register("email", { required: { value: true, message: "Email is required" }, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email is not valid" } })} onBlur={() => trigger("email")} />
                    </div>
                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="-64 0 512 512" height={20}><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                        <input placeholder="Enter  Password" className="input" type="password" {...register("password", { required: { value: true, message: "Password is required" }, pattern: { value: passwordpattern, message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character" } })} onBlur={() => trigger("password")} />
                    </div>
                    {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                    <div className="flex-column">
                        <label>Confirm Password </label></div>
                    <div className="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="-64 0 512 512" height={20}><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                        <input placeholder="Confirm Password" className="input" type="password" {...register("confirmPassword", { required: { value: true, message: "Confirm Password is required" }, validate: (value) => value === password || "Passwords do not match" })} onBlur={() => trigger("confirmPassword")} />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                    <label className='flex gap-2'>
                        <input type="checkbox" {...register("terms", { required: { value: true, message: "You must accept the terms and conditions" } })} />
                        Accept Terms and Conditions
                    </label>
                    {errors.terms && <p className='text-red-500 text-sm mt-1'>{errors.terms.message}</p>}
                    <button disabled={isSubmitting} className={`button-submit relative ${isSubmitting? 'disabled ':"" } `}type="submit">
                        <div className="loadercontainer absolute left-4 top-3">
                            {isSubmitting && <Loader />}
                        </div>
                        <span className='flex-1'>Sign Up</span></button>
                    {isSubmitSuccessful && <p className='text-green-500 text-sm mt-1'>Registration successful!</p>}
                </form>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 90%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
    ;
  }
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

  `;

export default Form;
