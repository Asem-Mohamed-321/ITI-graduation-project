import axios from 'axios';
import React, { useState ,useRef } from 'react';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';

export default function(){
    const fileInputRef = useRef(null);
    const [signUpType, setSignUpType] = useState('user'); // 'user' or 'company'

    const [step, setStep] = useState(1); // 1 or 2

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        picture: '',
        Fields: [],
        });
        const [emptyPassword, setEmptyPassword] = useState(false);
        const [passwordNotConfirmed, setPasswordNotConfirmed] = useState(false);
        const [emptyUsername, setEmptyUsername] = useState(false);
        const [emptyEmail, setEmptyEmail] = useState(false);
        const [emptyProfilePic, setEmptyProfilePic] = useState(false);
        const [emptyWorkFields, setEmptyWorkFields] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');

    const workFields = [
    "Accounting", "Administrative", "Advertising", "Architecture", "Arts & Design",
    "Automotive", "Business Development", "Construction", "Consulting", "Customer Service",
    "Data Analysis", "Design", "Education", "Engineering", "Entertainment", "Finance",
    "Healthcare", "Hospitality", "Human Resources", "Information Technology", "Legal",
    "Logistics", "Manufacturing", "Marketing", "Media & Communications", "Project Management",
    "Public Relations", "Real Estate", "Research", "Retail", "Sales", "Science",
    "Social Services", "Software Development", "Supply Chain", "Telecommunications",
    "Training", "Translation", "Transportation", "Writing & Editing"
    ];

    const options = workFields.map(field => ({ value: field, label: field }));

    const [selectedFields, setSelectedFields] = useState([]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    function handleFieldSelect(selectedOptions) {
        setSelectedFields(selectedOptions);
        setFormData({...formData,workFields: selectedOptions.map(option => option.value)});
    }
    function firstForm(e){
        e.preventDefault();
        setEmptyEmail(false);
        setEmptyUsername(false);
        setEmptyPassword(false);
        setEmptyProfilePic(false);
        setPasswordNotConfirmed(false);
        console.log("Form data:", formData);
        console.log(confirmPassword)
        console.log(emptyEmail, emptyUsername, emptyPassword, emptyProfilePic);

        if(confirmPassword !== formData.password){
            setPasswordNotConfirmed(true);
            alert("Passwords do not match!");
            return;
        }
        if  (!formData.email){
            setEmptyEmail(true);
            // alert("Please enter an email");
            return;
        }
        if(!formData.username){
            setEmptyUsername(true);
            // alert("Please enter a username");
            return;
        }
        
        if(!formData.password){
            setEmptyPassword(true);
            // alert("Please enter a password");
            return;
        }

        if(!formData.picture){
            setEmptyProfilePic(true);
            // alert("Please choose a profile picture");
            return;
        }
        setStep(2);
    }

    async function handleSubmit(e,signUpType){
        e.preventDefault();
        if(signUpType === 'user'){
            setEmptyWorkFields(false);
            if(selectedFields.length === 0) {
                setEmptyWorkFields(true);
                // alert("Please select at least one work field");
                return;
            }
            
            const updatedFormData = {
                ...formData,
                avatar: formData.picture,
                Fields: selectedFields.map(field => field.value),
            };
            try{
                const response = await axios.post('http://localhost:3000/auth/sign-up',updatedFormData);
                if(response.data){
                    console.log("Registration successful!");
                    alert("Registration successful!");
                }
            } catch (error) {
                console.error("There was an error during registration:", error);
                // alert("There was an error during registration! Check the console for details.");

                alert(error.response.data.message)
            }}
            else if(signUpType === 'company'){
            setEmptyWorkFields(false);
            if(selectedFields.length === 0) {
                setEmptyWorkFields(true);
                // alert("Please select at least one work field");
                return;
            }
            // const { email, companyName, password, logoFile, Fields  } = formData;
            const email = formData.email;
            const companyName = formData.username;
            const password = formData.password;
            const logoFile = formData.picture; // Assuming this is a string path to the logo
            const companyFormData = new FormData();
            companyFormData.append('email', email);
            companyFormData.append('companyName', companyName);
            companyFormData.append('password', password);
            companyFormData.append('logoFile', logoFile);
            selectedFields.forEach((field) => {
                companyFormData.append('Fields[]', field.value);
            });

            // companyFormData.append('Fields', Fields);
            const fields = selectedFields.map(field => field.value); // or .label depending on what you want
            
            try{
                const response = await axios.post('http://localhost:3000/company/sign-up',companyFormData);
                if(response.data){
                    console.log("Company Registration successful!");
                    alert("Company Registration successful!");
                }
            } catch (error) {
                console.error("There was an error during registration:", error);
                // alert("There was an error during registration! Check the console for details.");
                alert(error.response.data.message)
            }
        }
    }

    function changeType() {
        setSignUpType(signUpType === 'user' ? 'company' : 'user');
        setStep(1);
        setFormData({
            email: '',
            username: '',
            password: '',
            picture: '',
            Fields: [],
        });
        setConfirmPassword('');
        setEmptyEmail(false);
        setEmptyUsername(false);
        setEmptyPassword(false);
        setEmptyProfilePic(false);
        setPasswordNotConfirmed(false);
        setEmptyWorkFields(false);
        setSelectedFields([]);
    }


    return (
        <>
            <div className="flex w-11/12 min-h-[600px] max-h-[90vh] m-auto mt-5 bg-white overflow-hidden rounded-lg">
                <div className="hidden md:flex md:w-1/2 py-4 px-5 items-center justify-center bg-gray-200 dark:bg-slate-800">
                    <div className="aspect-[4/3] w-full ">
                        <img
                        className="w-full h-full object-contain"
                        src="../src/assets/registerVectorImage.png"
                        alt="Login vector photo"
                        />
                    </div>
                </div>

                {/* User Sign Up Form */ }
                {step === 1 && signUpType === 'user' && (   
                <div className="md:w-1/2 w-full  pb-35 dark:bg-gray-700">
                    <p className='relative top-0 right-0 pb-20 text-right mr-2 cursor-pointer text-blue-500 dark:text-blue-300 text-xs' onClick={changeType}>or sign up as a company {">>"}</p>
                    <p className="text-center font-extrabold mb-12 dark:text-white">SIGN UP FOR THE CV CHECKER</p>
                    <form className="flex flex-col space-y-0 mx-auto  w-fit  md:w-96 px-8 dark:bg-gray-700">
                        {/* mx-48 */}
                        <div>
                            <input id="email" type="text" placeholder="Email address" onChange={handleChange} value={formData.email} className={`w-full block ${emptyEmail ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            {emptyEmail && <p className="text-red-600 text-sm sm:text-base font-light italic">Please enter an email</p>}
                        </div>
                        <div>
                            <input id="username" type="text" placeholder="Username" onChange={handleChange} value={formData.username}   className={`w-full block ${emptyUsername ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            {emptyUsername && <p className="text-red-600 text-sm sm:text-base font-light italic">Please enter a username</p>}
                        </div>
                        <div>
                            {/* <label className="text-sm font-bold dark:text-white" htmlFor="password">Password</label> */}
                            {/* <input id="password" type="password" placeholder="Password" className="w-full border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500" /> */}
                            <input id="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} className={` block w-full  ${emptyPassword ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-red-500-700 dark:bg-slate-800 dark:text-white`} />
                            {emptyPassword && <p className="text-red-600 text-sm sm:text-base font-light italic">Please choose a password</p>}
                        </div>
                        <div>
                            <input id="confirmPassword" type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className={`w-full block ${passwordNotConfirmed ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            {passwordNotConfirmed && <p className="text-red-600 text-sm sm:text-base font-light italic">passwords don't match</p>}
                        </div>
                        <div>
                            <input  type="text" placeholder="Choose profile pic" value={formData.picture?.name || ''} onClick={() => fileInputRef.current.click()}  className={`w-full block cursor-pointer ${emptyProfilePic ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            <input type='file' id="picture" className='hidden' ref={fileInputRef} onChange={handleChange}></input>                            {emptyProfilePic && <p className="text-red-600 text-sm sm:text-base font-light italic">Please choose a profile picture</p>}
                        </div>
                        
                        <div>
                            <button type='button' onClick={firstForm} className="w-fit cursor-pointer bg-blue-500 text-white px-3 py-2 mt-8 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">Sign Up</button>
                        </div>
                        <div className="mx-auto  mt-2 text-xs ">
                        <p className="inline font-normal dark:text-slate-400">Already have an account ? <NavLink to="/login" className="inline text-blue-500 dark:text-blue-300">Login</NavLink></p>
                    
                    </div>
                    </form>
                    

                </div >)}

                {/* Company Sign Up Form */ }
                {step === 1 && signUpType === 'company' && (<div className="md:w-1/2 w-full  pb-35 dark:bg-gray-700">
                    <p className='relative top-0 right-0 pb-20 text-right mr-2 cursor-pointer text-blue-500 dark:text-blue-300 text-xs' onClick={changeType}>or sign up as an employee {">>"}</p>
                    <p className="text-center font-extrabold mb-12 dark:text-white">SIGN UP TO FIND BEST CANDIDATES</p>
                    <form className="flex flex-col space-y-0 mx-auto  w-fit  md:w-96 px-8 dark:bg-gray-700">
                        {/* mx-48 */}
                        <div>
                            <input id="email" type="text" placeholder="Company mail" onChange={handleChange} value={formData.email} className={`w-full block ${emptyEmail ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            {emptyEmail && <p className="text-red-600 text-sm sm:text-base font-light italic">Please enter an email</p>}
                        </div>
                        <div>
                            <input id="username" type="text" placeholder="Company name" onChange={handleChange} value={formData.username}   className={`w-full block ${emptyUsername ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            {emptyUsername && <p className="text-red-600 text-sm sm:text-base font-light italic">Please enter a username</p>}
                        </div>
                        <div>
                            {/* <label className="text-sm font-bold dark:text-white" htmlFor="password">Password</label> */}
                            {/* <input id="password" type="password" placeholder="Password" className="w-full border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500" /> */}
                            <input id="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} className={` block w-full  ${emptyPassword ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-red-500-700 dark:bg-slate-800 dark:text-white`} />
                            {emptyPassword && <p className="text-red-600 text-sm sm:text-base font-light italic">Please choose a password</p>}
                        </div>
                        <div>
                            <input id="confirmPassword" type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className={`w-full block ${passwordNotConfirmed ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            {passwordNotConfirmed && <p className="text-red-600 text-sm sm:text-base font-light italic">passwords don't match</p>}
                        </div>
                        <div>
                            <input  type="text" placeholder="Choose profile pic" value={formData.picture?.name || ''} onClick={() => fileInputRef.current.click()}  className={`w-full block cursor-pointer ${emptyProfilePic ? 'border-1 border-red-500' : 'border-2 border-gray-300'} rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`} />
                            <input type='file' id="picture" className='hidden' ref={fileInputRef} onChange={handleChange}></input>
                            {emptyProfilePic && <p className="text-red-600 text-sm sm:text-base font-light italic">Please choose a profile picture</p>}
                        </div>
                        
                        <div>
                            <button type='button' onClick={firstForm} className="w-fit cursor-pointer bg-blue-500 text-white px-3 py-2 mt-8 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">Sign Up</button>
                        </div>
                        <div className="mx-auto  mt-2 text-xs ">
                        <p className="inline font-normal dark:text-slate-400">Already have an account ? <NavLink to="/login" className="inline text-blue-500 dark:text-blue-300">Login</NavLink></p>
                    
                    </div>
                    </form>
                    

                </div >)}

                {step === 2 && (
                    <div className="md:w-1/2 w-full pt-20 pb-35 dark:bg-gray-700">
                    <p className="text-center font-extrabold mb-12 dark:text-white">SIGN UP FOR THE CV CHECKER</p>
                    <form className="flex flex-col space-y-0 mx-auto  w-fit  md:w-96 px-8 dark:bg-gray-700">
                        {/* mx-48 */}
                        {/* <div>
                            <input id="fullName" type="text" placeholder="Full Name" className="w-full block border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <div>
                            <input id="age" type="text" placeholder="Age" className="w-full block border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <div>
                            {/* <label className="text-sm font-bold dark:text-white" htmlFor="password">Password</label> */}
                            {/* <input id="password" type="password" placeholder="Password" className="w-full border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500" /> */}
                            {/* <input id="phone" type="text" placeholder="Phone" className=" block w-full border-1 border-red-500 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-red-500-700 dark:bg-slate-800 dark:text-white" />
                            <p className="text-red-600 text-sm sm:text-base font-light italic">Please write a phone</p>
                        </div>  */}
                        <div>
                            <Select
                                isMulti
                                options={options}
                                value={selectedFields}
                                onChange={handleFieldSelect}
                                placeholder="Select your work fields"
                                className="w-full mt-2"
                                isOptionDisabled={() => selectedFields.length >= 5}

                            />
                        </div>
                        {emptyWorkFields && <p className="text-red-600 text-sm sm:text-base font-light italic">Please select at least one work field</p>}
                        <div className="mt-4">
                            <p className="text-sm font-bold dark:text-white">You can select up to 5 work fields</p>
                        </div>
                        
                        <div>
                            <button type='button' onClick={() => setStep(1)} className="w-fit cursor-pointer bg-blue-500 text-white px-3 py-2 mt-8 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">Back</button>
                            <button type='submit' onClick={(e)=>handleSubmit(e,signUpType)} className="float-end w-fit cursor-pointer bg-blue-500 text-white px-3 py-2 mt-8 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">Submit</button>

                        </div>
                        <div className="mx-auto  mt-2 text-xs ">
                        <p className="inline font-normal dark:text-slate-400">Already have an account ? <NavLink to="/login" className="inline text-blue-500 dark:text-blue-300">Login</NavLink></p>
                    
                    </div>
                    </form>
                    
                    
                </div>)}

            </div>
        </>
    )
}

