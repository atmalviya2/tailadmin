import { Button, Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { FC, useCallback, useMemo, useState } from 'react';
import './mobile-desktop-usage.css';

setOptions({
  // localeJs,
  // themeJs
});

const DatepickerMobi: FC = () => {
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setOpenPicker(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenPicker(false);
  }, []);

  const inputProps = useMemo(
    () => ({
      className: 'md-mobile-picker-input',
      placeholder: 'Please Select...',
    }),
    [],
  );

  const boxInputProps = useMemo(
    () => ({
      className: 'md-mobile-picker-box-label',
      inputStyle: 'box',
      placeholder: 'Please Select...',
    }),
    [],
  );

  return (
    <Page>
      <div className="mbsc-grid">
        <div className="mbsc-form-group">
          <div className="mbsc-row">
            <div className="mbsc-col-12">
              <div className="mbsc-txt-muted md-mobile-picker-header">Use the picker with any inputs & show on focus/click</div>
              <Datepicker select="range" inputComponent="input" inputProps={inputProps} />
            </div>
          </div>
        </div>
        <div className="mbsc-form-group">
          <div className="mbsc-row">
            <div className="mbsc-col-12 mbsc-txt-muted md-mobile-picker-header">
              Disable <code>onClick/onFocus</code> and only show on button
            </div>
            <div className="mbsc-col-8">
              <Datepicker
                select="range"
                inputComponent="input"
                inputProps={inputProps}
                showOnClick={false}
                showOnFocus={false}
                isOpen={openPicker}
                onClose={handleClose}
              />
            </div>
            <div className="mbsc-col-4">
              <Button variant="outline" color="primary" className="md-mobile-picker-button" onClick={handleClick}>
                Show picker
              </Button>
            </div>
          </div>
        </div>
        <div className="mbsc-form-group">
          <div className="mbsc-row">
            <div className="mbsc-col-12">
              <div className="mbsc-txt-muted md-mobile-picker-header">Use the picker with a Mobiscroll input</div>
              <Datepicker select="range" inputProps={boxInputProps} />
            </div>
          </div>
        </div>
        <div className="mbsc-txt-muted md-mobile-picker-header">Use the picker inline in any page</div>
      </div>
    </Page>
  );
};
export default DatepickerMobi;