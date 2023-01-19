import React, { useState } from 'react';

const userInfoFields = {
  field_title: {
    fieldName: 'Title',
    type: 'select',
    extra: {
      options: [
        {
          value: 0,
          label: 'None',
        },
        {
          value: 1,
          label: 'Mr.',
        },
        {
          value: 2,
          label: 'Ms.',
        },
        {
          value: 3,
          label: 'Mrs.',
        },
        {
          value: 4,
          label: 'Other',
        },
      ],
    },
  },
  field_firstName: {
    fieldName: 'First Name',
    type: 'text',
  },
  field_lastName: {
    fieldName: 'Last Name',
    type: 'text',
  },
  field_email: {
    fieldName: 'Email',
    type: 'text',
  },
  field_phone: {
    fieldName: 'Phone',
    type: 'text',
  },
  field_username: {
    fieldName: 'Username',
    type: 'text',
    onChange: () => {
      console.log('test');
    },
  },
  field_password: {
    fieldName: 'Password',
    type: 'text',
  },
};

// ___________________________________________________________

const SubmitButton = (props) => {
  const { buttonText = 'Submit' } = props;

  return <input className="SubmitButton" type="submit" value={buttonText} />;
};

function InputRenderer(props) {
  const { field = {}, fieldKey = '' } = props;
  const {
    fieldName = '',
    customClass = '',
    type = 'text',
    placeholder = '',
    pattern = '',
    isReadOnly = false,
    isDisabled = false,
    isRequired = false,
    extra = {},
    onChange = (event) => {
      props?.callback(fieldKey, event.target.value);
    },
    onBlur = () => {},
    onFocus = () => {},
  } = field;

  function inputDom() {
    let input = (
      <input
        type={type}
        placeholder={placeholder}
        name={fieldKey}
        id={fieldKey}
        className={`${fieldKey} ${customClass}`}
        // pattern={pattern}
        readOnly={isReadOnly}
        disabled={isDisabled}
        required={isRequired}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );

    switch (type) {
      case 'select':
        input = (
          <select
            name={fieldKey}
            id={fieldKey}
            className={`${fieldKey} ${customClass}`}
            disabled={isDisabled}
            required={isRequired}
            multiple={extra.multiple}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          >
            <option>-- Select an option --</option>
            {(extra.options || []).map((option, idx) => {
              return (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        );
      default:
        break;
    }
    return input;
  }

  return (
    <div>
      <label>{fieldName || fieldKey}</label>
      {inputDom()}
    </div>
  );
}

const UserInfoInputs = (props) => {
  const { fields = {}, callback = () => {} } = props;

  function test() {
    const values = Object.keys(fields).map((fieldKey, idx) => {
      return fields[fieldKey];
    });
    return values;
  }

  // console.log(test());
  return (
    <div className="UserInfoInputs">
      {Object.keys(fields).map((fieldKey, idx) => {
        return (
          <InputRenderer
            field={{ ...fields[fieldKey] }}
            fieldKey={fieldKey}
            callback={callback}
          />
        );
      })}
    </div>
  );
};

const UserInfoForm = (props) => {
  const { fields } = props;
  const [data, setData] = useState({});
  function callback(fieldKey, value) {
    let tempData = { ...data };
    tempData[fieldKey] = value;
    setData(tempData);
    console.log(tempData);
  }
  return (
    <form className="UserInfoForm" onSubmit={() => alert('Form Submitted')}>
      <UserInfoInputs fields={fields} callback={callback} />
      <UserInfoInputs
        fields={fields}
        callback={(fieldKey, value) => {
          console.log(fieldKey, value);
        }}
      />
      <SubmitButton />
    </form>
  );
};

export default function App(props) {
  return <UserInfoForm fields={userInfoFields} />;
}
