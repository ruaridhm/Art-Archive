import styled from 'styled-components';

export const DropdownContainer = styled.div`
  width: 20em;
  margin: 1rem auto 0 auto;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  min-height: 38px;
  flex-wrap: wrap;
`;

export const DropdownHeader = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-color: ${({ theme }) => theme.backgroundLight};
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  padding: 0 1.2em;
`;

export const DropdownHeaderTitle = styled.div`
  margin: auto 0;
  display: flex;
`;
export const DropdownHeaderTitleBold = styled.div`
  font-weight: bold;
  margin-right: 0.25rem;
`;

export const DropdownHeaderAction = styled.div``;

export const DropdownList = styled.ul`
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  padding: 0;
  margin: 0;
  width: 19.9em;
  height: 10rem;
  margin-top: 55px;
  position: absolute;
  z-index: 1;
`;

export const Scrollbar = styled.div`
  float: left;
  height: fit-content;
  max-height: 15em;
  width: 100%;
  background: #999;
  overflow-y: scroll;
  margin-bottom: 25px;
  border-bottom: 1px solid grey;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #999;
  }
`;

export const DropdownListItem = styled.li`
  list-style-type: none;
  :first-of-type > button {
    border-top: 1px solid ${({ theme }) => theme.backgroundLight};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  :last-of-type > button {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
export const DropdownListItemButton = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.white};
  font-size: 1rem;
  padding: 0.9em 1.2em 0.9em 1.2em;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};
  width: 100%;
  text-align: left;
  border-left: 1px solid ${({ theme }) => theme.backgroundLight};
  border-right: 1px solid ${({ theme }) => theme.backgroundLight};
  &:hover,
  &:focus {
    cursor: pointer;
    font-weight: bold;
    background-color: ${({ theme }) => theme.backgroundLight};
  }
`;
