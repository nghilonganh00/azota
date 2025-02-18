import React, { createContext, useContext, useState, ReactNode, Fragment } from "react";

// Define the context and its properties
interface DropdownContextProps {
  isOpen: boolean;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

// Define the component props
interface DropdownProps {
  children: ReactNode;
}

interface DropdownButtonProps {
  children: ReactNode;
}

interface DropdownItemProps {
  children: ReactNode;
}

interface DropdownPanelProps {
  children: ReactNode;
}

// Main Dropdown component with subcomponents
const MenuDropdown: React.FC<DropdownProps> & {
  Button: React.FC<DropdownButtonProps>;
  Panel: React.FC<DropdownPanelProps>;
  Item: React.FC<DropdownItemProps>;
} = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

// Dropdown Button subcomponent
const Button: React.FC<DropdownButtonProps> = ({ children }) => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown.Button must be used within a Dropdown");
  }

  return <div onClick={context.toggle}>{children}</div>;
};

// Dropdown Item subcomponent
const Item: React.FC<DropdownItemProps> = ({ children }) => {
  const context = useContext(DropdownContext);
  return <div onClick={context?.toggle}>{children}</div>;
};

// Dropdown Panel subcomponent
const Panel: React.FC<DropdownPanelProps> = ({ children }) => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown.Panel must be used within a Dropdown");
  }

  return (
    <Fragment>
      {context.isOpen && (
        <Fragment>
          <div className="fixed inset-0 z-0 h-screen w-screen" onClick={context.toggle}></div>
          <div className="relative z-10"> {children}</div>
        </Fragment>
      )}
    </Fragment>
  );
};

// Assign subcomponents to the main component
MenuDropdown.Button = Button;
MenuDropdown.Panel = Panel;
MenuDropdown.Item = Item;

export default MenuDropdown;
