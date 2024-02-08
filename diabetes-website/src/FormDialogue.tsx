import './FormDialogue.css'
import { useState } from 'react';


function FormDialogue(){
    const [age, setAge] = useState(0)
    const [urea, setUrea] = useState(0.0)
    const [cr, setCr] = useState(0)
    const [hba1c, setHba1c] = useState(0.0)
    const [chol, setChol] = useState(0.0)
    const [tg, setTg] = useState(0.0)
    const [hdl, setHdl] = useState(0.0)
    const [ldl, setLdl] = useState(0.0)
    const [vldl, setVldl] = useState(0.0)
    const [bmi, setBmi] = useState(0)
    const [gender, setGender] = useState('')
    const [ans, setAnswer] = useState('')
    const data2 = {
        'age' : '',
        'urea' : '',
        'cr' : '',
        'hba1c' : '',
        'chol' : '',
        'tg' : '',
        'hdl' : '',
        'ldl' : '',
        'vldl' : '',
        'bmi' : '',
        'gender' : ''
    };
    async function handleSubmit(e: any){
        e.preventDefault();

        data2['age'] = String(age)
        data2['urea'] = String(urea)
        data2['cr'] = String(cr)
        data2['hba1c'] = String(hba1c)
        data2['chol'] = String(chol)
        data2['tg'] = String(tg)
        data2['hdl'] = String(hdl)
        data2['ldl'] = String(ldl)
        data2['vldl'] = String(vldl)
        data2['bmi'] = String(bmi)
        data2['gender'] = String(gender)


        
        await fetch("http://127.0.0.1:5000/predict",{
            method : 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'text/json',
            },
            body: JSON.stringify(data2)
        }).then((response) => {
            if (!response.ok) {
                console.error(`Did not get an ok. got: ${response.statusText}`);
            }
            return response.json();
        }).then((response) => {
            // setResult(json['result'])
            if (response['result'][0] == 'Y'){
                setAnswer('Diabetic: Based on your input there is a very high chance you are diabetic')
            }
            else if(response['result'][0] == 'P'){
                setAnswer('Pre-Diabetic: Based on your input there is a very high chance you are pre-diabetic. This means that you have the conditions required to be diabetic but have not acquired it yet.')
            }
            else if (response['result'][0] == 'N'){
                setAnswer('Not-Diabetic: Based on your input data the classifier predicts that you do not have diabetes.')
            }
        })
        .catch(error => console.log(error))


       }

    
    return(
        <>
        <div id="formbg">
        <form onSubmit={handleSubmit}>
            <p id='heading'>DETAILS</p>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="age">Age</label>
                    </td>
                    <td>
                    <input type="number" name="age" id="age" value={age} onChange={(e)=> setAge(Number(e.target.value))}/>
                    </td>
                    <td>
                        <label htmlFor="urea">Urea</label>
                    </td>
                    <td>
                    <input type="number" name="urea" id="urea" step={"0.1"} value={urea} onChange={(e)=> setUrea(Number(e.target.value))} required/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label htmlFor="cr">Cr</label>
                    </td>
                    <td>
                    <input type="number" name="cr" id="cr" value={cr} onChange={(e)=> setCr(Number(e.target.value))} required/>
                    </td>
                    <td>
                        <label htmlFor="hba1c">HbA1c</label>
                    </td>
                    <td>
                    <input type="number" name="hba1c" id="hba1c" step={"0.1"} value={hba1c} onChange={(e)=> setHba1c(Number(e.target.value))} required/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label htmlFor="chol">Cholestrol</label>
                    </td>
                    <td>
                    <input type="number" name="chol" id="chol" step={"0.1"} value={chol} onChange={(e)=> setChol(Number(e.target.value))} required/>
                    </td>
                    <td>
                        <label htmlFor="tg">TG</label>
                    </td>
                    <td>
                    <input type="number" name="tg" id="tg" step={"0.1"} value={tg} onChange={(e)=> setTg(Number(e.target.value))} required/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label htmlFor="hdl">HDL</label>
                    </td>
                    <td>
                    <input type="number" name="hdl" id="hdl" step={"0.1"} value={hdl} onChange={(e)=> setHdl(Number(e.target.value))} required/>
                    </td>
                    <td>
                        <label htmlFor="ldl">LDL</label>
                    </td>
                    <td>
                    <input type="number" name="ldl" id="ldl" step={"0.1"} value={ldl} onChange={(e)=> setLdl(Number(e.target.value))} required/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label htmlFor="vldl">VLDL</label>
                    </td>
                    <td>
                    <input type="number" name="vldl" id="vldl" step={"0.1"} value={vldl} onChange={(e)=> setVldl(Number(e.target.value))} required/>
                    </td>
                    <td>
                        <label htmlFor="bmi">BMI</label>
                    </td>
                    <td>
                    <input type="number" name="bmi" id="bmi" value={bmi} onChange={(e)=> setBmi(Number(e.target.value))} required/>
                    </td>
                </tr>

                <tr>

                    <td>
                        <label htmlFor="male">Male</label>
                    </td>
                    <td>
                        <input type="radio" name="gender" id="male" value={gender} onChange={(e)=> setGender('M')} required/>
                    </td>
                    <td>
                        <label htmlFor="female">Female</label>
                    </td>
                    <td>
                        <input type="radio" name="gender" id="female" value={gender}  onChange={(e)=> setGender('F')} required/>
                    </td>
                </tr>
                
            </tbody>
            </table>
            <input id='sub' type="submit" value="submit" />
        </form>
        </div>

        {ans.length === 0 ? '' : <div id='formbg' ><p id='heading'>Result</p><p>{ans}</p></div>}
        </>
    )
}

export default FormDialogue;