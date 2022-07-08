import './App.css';
import PatientRegister from './Components/PatientRegister/PatientRegister';
import Homepage from './Components/Homepage/Homepage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PatientLogin from './Components/PatientLogin/PatientLogin';
import DoctorLogin from './Components/DoctorLogin/DoctorLogin';
import DoctorHome from './Components/DoctorHome/DoctorHome';
import PatientHome from './Components/PatientHome/PatientHome';
import Appointment from './Components/Appointment/Appointment';
import AppointmentDetails from './Components/AppointmentDetails/AppointmentDetails';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
      <Route path={'/'} exact component={Homepage} />
      <Route path="/register/"  component={PatientRegister} />
      <Route path="/login/"  component={PatientLogin} />
      <Route path="/doctorlogin/"  component={DoctorLogin} />
      <Route path="/doctor/home"  component={DoctorHome} />
      <Route path="/patient/home/"  component={PatientHome} />
      <Route path="/book_appointment/"  component={Appointment} />
      <Route path="/appointments/"  component={AppointmentDetails} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
