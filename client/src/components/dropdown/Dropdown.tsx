import React from 'react';

import {
  DropdownContainer,
  DropdownWrapper,
  DropdownHeader,
  DropdownHeaderTitle,
  DropdownHeaderTitleBold,
  DropdownHeaderAction,
  DropdownList,
  DropdownListItem,
  DropdownListItemButton,
  Scrollbar,
} from './Style';

interface itemInterface {
  id: number;
  title: string;
}

interface DropdownProps {
  title: string;
  items: Array<itemInterface>;
  multiSelect?: boolean;
  selection: Array<{ id: number; title: string }>;
  setSelection: React.Dispatch<React.SetStateAction<any[]>>;
  open: string;
  setOpen: any;
}

const Dropdown = ({
  title,
  items,
  multiSelect = false,
  selection,
  open,
  setOpen,
  setSelection,
}: DropdownProps) => {
  const toggle = () => {
    open === title ? setOpen('') : setOpen(title);
  };

  const handleOnClick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        setOpen('');
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  };

  const isItemInSelection = (item: itemInterface) => {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  };

  return (
    <DropdownContainer>
      <DropdownWrapper>
        <DropdownHeader
          tabIndex={0}
          role='button'
          onKeyPress={() => toggle()}
          onClick={() => toggle()}
        >
          <DropdownHeaderTitle>
            <DropdownHeaderTitleBold>{title} </DropdownHeaderTitleBold>
            {selection.length > 0 ? selection[0].title : ''}
          </DropdownHeaderTitle>
          <DropdownHeaderAction>
            <p>{open === title ? 'Close' : 'Open'}</p>
          </DropdownHeaderAction>
        </DropdownHeader>
        {open === title && (
          <DropdownList>
            <Scrollbar>
              {items.map((item) => (
                <DropdownListItem key={item.id}>
                  <DropdownListItemButton
                    type='button'
                    onClick={() => handleOnClick(item)}
                  >
                    <span>{item.title}</span>
                    <span>{isItemInSelection(item) && 'Selected'}</span>
                  </DropdownListItemButton>
                </DropdownListItem>
              ))}
            </Scrollbar>
          </DropdownList>
        )}
      </DropdownWrapper>
    </DropdownContainer>
  );
};
export default Dropdown;
