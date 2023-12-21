import { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import LoginForm from "./Login";
import SignupForm from "./Signup";

const tabData = [
  {
    tab: "Log in",
    id: 1,
    tabName: "tab1",
    component: LoginForm,
  },
  {
    tab: "Sign up",
    id: 2,
    tabName: "tab2",
    component: SignupForm,
  },
];

const ModalComponent = ({open, onCloseModal}: any) => {
const [activeTab, setActiveTab] = useState<string>("tab1");

 useEffect(() => {
    setActiveTab(activeTab);
}, [activeTab]);


  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "customModalAuth",
        }}
        data-cy='modal'
      >
        <>
          <div className='flex items-center justify-around mb-[20px]'>
            {tabData.map((tabs) => (
              <button
                key={tabs.id}
                onClick={() => setActiveTab(tabs.tabName)}
                className={
                  activeTab === `${tabs.tabName}`
                    ? "px-4 text-sm py-4 bg-blue-600 text-white rounded-full"
                    : "px-2 py-2 text-sm text-slate-600 rounded-full"
                }
              >
                {tabs.tab}
              </button>
            ))}
          </div>
          <div className=''>
            <>
              {tabData.map((content) => (
                <div key={content.id} className='px-2 py-2'>
                  {activeTab === content.tabName && (
                    <>
                      <content.component />
                    </>
                  )}
                </div>
              ))}
            </>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default ModalComponent;
