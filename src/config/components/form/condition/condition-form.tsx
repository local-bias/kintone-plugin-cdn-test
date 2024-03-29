import React, { ChangeEventHandler, VFC, VFCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';
import { Properties } from '@kintone/rest-api-client/lib/client/types';

import { appFieldsState, storageState } from '../../../states';
import { MenuItem, TextField } from '@mui/material';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {
  appFields: Properties;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Component: VFCX<Props> = ({ className, condition, appFields, onChange }) => (
  <div {...{ className }}>
    <div>
      <h3>対象フィールド</h3>
      <TextField
        select
        value={condition.field}
        label='フィールド名'
        {...{ onChange }}
        className='input'
      >
        {Object.values(appFields).map(({ code, label }, i) => (
          <MenuItem key={i} value={code}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    border-left: 2px solid #0003;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }

  .input {
    min-width: 250px;
  }
`;

const Container: VFC<ContainerProps> = ({ condition, index }) => {
  const appFields = useRecoilValue(appFieldsState);
  const setStorage = useSetRecoilState(storageState);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].field = e.target.value;
      })
    );
  };

  return <StyledComponent {...{ condition, index, appFields, onChange }} />;
};

export default Container;
