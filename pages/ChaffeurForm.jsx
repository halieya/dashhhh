import React  from "react";



export default class VehicleForm extends React.Component {


    constructor(props){
        super(props);
        this.state={
          showModal:false
        }

       
    }


    setShowModal=() => {

      this.setState({
        showModal: !this.state.showModal
      })
    }



  

    render(){

        return (

        <div className="form-container">

<button
        className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => this.setShowModal(true)}
      >
        {this.props.updated===true ?  <p>update_chauffer</p> :  <p>ajouter_chauffer</p>}
      
      </button>
      {this.state.showModal ||   this.props.updated  ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   chauffeur
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => this.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form>
        <div>
        {
        this.props.updated === true  ?  
          <h3>update chauffeur</h3> :
          <h3>
             ajouter chauffeur
          </h3>

        }

        </div>
    

      {
        this.props.updated === true  ?  

        <>
        <div>
        <input
          type="hidden"
          name="ID"
         
          value={this.props.id}
        
        />   
        </div> </> :  <></>
      }
        

       
        <div>
          <input
            type="text"
            name="cin"
            placeholder="cin"
            value={this.props.chauffeur.cin}
            onChange={e=> this.props.handleChange(e)}
          />
        </div>
        <div>
          <input
            type="hidden"
            name="filter"
            placeholder="filter"
            value={this.props.chauffeur.filter}
            onChange={e=> this.props.handleChange(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="fullname"
            placeholder="fullname"
            value={this.props.chauffeur.fullname}
            onChange={e=> this.props.handleChange(e)}
          />
        </div>


        <div>
          <input
            type="text"
            name="permis"
            placeholder="permis"
            value={this.props.chauffeur.permis}
            onChange={e=> this.props.handleChange(e)}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.props.chauffeur.email}
            onChange={e=> this.props.handleChange(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="tele"
            placeholder="tele"
            value={this.props.chauffeur.tele}
            onChange={e=> this.props.handleChange(e)}
          />
        </div>
    <div>
        <select name="fonction" value={this.props.selectedId} onChange={e=> this.props.handleSelectChange(e)}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">-- Fontion --</option>
          <option value="CHAUFFEUR">CHAUFFEUR</option>
          <option value="CONVOYEUR">CONVOYEUR</option>
         
          {/* Add more options as needed */}
        </select>
        {this.props.selectedId}

        </div>
        




        <div>

        {
        this.props.updated === true  ?  

        
        <button type="submit" onClick={this.props.handleupdate} hidden>update vehicule</button>
        
        :   <button type="submit" onClick={this.props.handleSubmit} hidden>Submit vehicule</button>
      }


        
        </div>
      </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => window.location.reload()}
                  >
                    Close
                  </button>

                  {this.props.updated === true  ?      <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={this.props.handleupdate}
                  >
                    update Changes
                  </button> :
                  
                  <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={this.props.handleSubmit}
                >
                  Save Changes
                </button>
                  }
             
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    

      
    </div>

        )

    }
}