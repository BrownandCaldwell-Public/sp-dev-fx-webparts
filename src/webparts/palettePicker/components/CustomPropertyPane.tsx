import * as React from 'react';
import { PropertyPanePortal } from 'property-pane-portal';
import { ICustomPropertyPaneProps } from './ICustomPropertyPaneProps';
import styles from './CustomPropertyPane.module.scss';
import { Range } from 'react-range';
import { composeComponentAs } from 'office-ui-fabric-react';
import { Colors } from './Colors';


//ORIGINAL CODE
const getCode = (hue, saturation, lightness, shades) => {
    /*document.documentElement.style.setProperty(
      '--hue',
      hue[1] - hue[0] + (hue[1] - hue[0]) / 2
    ) */
    
    let RESULT= "";
    try {
        const HUE_STEP = (hue[1] - hue[0]) / shades
        const LIGHT_STEP = (lightness[1] - lightness[0]) / shades
        const SAT_STEP = (saturation[1] - saturation[0]) / shades
        RESULT = `:root {\n`
        for (let s = 0; s < shades + 1; s++) {
        const HUE = Math.floor(hue[1] - s * HUE_STEP)
        const LIGHTNESS = Math.floor(lightness[1] - s * LIGHT_STEP)
        const SATURATION = Math.floor(saturation[1] - s * SAT_STEP)
        RESULT += `  --color-${s +
            1}: hsl(${HUE}, ${SATURATION}%, ${LIGHTNESS}%);\n`
        }
        console.log("RESULT:", RESULT);
    }
    catch (ex) {}
    return (RESULT += '}')
  }


  //MADE AN OBJECT INSTEAD
  const cssObj = (hue, saturation, lightness, shades) => {
    let obj = {};
    try {
        const HUE_STEP = (hue[1] - hue[0]) / shades
        const LIGHT_STEP = (lightness[1] - lightness[0]) / shades
        const SAT_STEP = (saturation[1] - saturation[0]) / shades
        //let RESULT = `:root {\n`
        for (let s = 0; s < shades + 1; s++) {
        const HUE = Math.floor(hue[1] - s * HUE_STEP)
        const LIGHTNESS = Math.floor(lightness[1] - s * LIGHT_STEP)
        const SATURATION = Math.floor(saturation[1] - s * SAT_STEP)
        obj[`--color-${s + 1}`] = `hsl(${HUE}, ${SATURATION}%, ${LIGHTNESS}%)`;
        }
    } catch(ex) {console.log("obj problems"); }
   // console.log("RESULT:", RESULT);
   console.log("color obj:", obj);
    return obj;
  }



export const CustomPropertyPane: React.FunctionComponent<ICustomPropertyPaneProps> = (props) => {


    const[colorObj, setColorObj] = React.useState({});

    React.useEffect(() => {

        try {
            setColorObj(cssObj(props.properties["fieldSetHue"], props.properties["fieldSetSat"],props.properties["fieldSetLight"],props.properties["fieldSetShades"][0]));
        }
        catch(ex) {
            console.log("color issues");
        }
    }, []);  // empty array means useEffect only runs once (I think);



    return (       
        <PropertyPanePortal context={props.context}>
            <fieldset data-property="fieldSetHue" className={styles.CustomPropertyPane} >
            <div className={styles.labelContainer}>
            <label>Hue</label>
            </div>
            <Range
                step={1}
                min={0}
                max={360}
                values={ props.properties["fieldSetHue"] ? props.properties["fieldSetHue"] : [0, Math.floor(Math.random() * 360)] }
                onChange={(values) => { 
                                props.updateWebPartProperty("fieldSetHue", values);
                                setColorObj(cssObj(props.properties["fieldSetHue"], props.properties["fieldSetSat"],props.properties["fieldSetLight"],props.properties["fieldSetShades"][0]));

                        }}
                renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc'
                    }}
                >
                    {children}
                </div>
                )}
                renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '30px',
                    width: '30px',
                    backgroundColor: '#999'
                    }}
          />
        )}
      />

            </fieldset>
            <fieldset data-property="fieldSetSat" className={styles.CustomPropertyPane} >
            <div className={styles.labelContainer}><label>Saturation</label></div>
            <Range
                step={1}
                min={0}
                max={100}
                values={props.properties["fieldSetSat"] ? props.properties["fieldSetSat"] : [0, 100]}
                onChange={(values) => { 
                    props.updateWebPartProperty("fieldSetSat", values);
                    setColorObj(cssObj(props.properties["fieldSetHue"], props.properties["fieldSetSat"],props.properties["fieldSetLight"],props.properties["fieldSetShades"][0]));

                }
                    
                }
                renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc'
                    }}
                >
                    {children}
                </div>
                )}
                renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '30px',
                    width: '30px',
                    backgroundColor: '#999'
                    }}
          />
        )}
      />

            </fieldset>
            <fieldset data-property="fieldSetLight" className={styles.CustomPropertyPane} >
            <div className={styles.labelContainer}>
            <label>
            Lightness
            </label>
            </div>
            <Range
                step={1}
                min={0}
                max={100}
                values={props.properties["fieldSetLight"] ? props.properties["fieldSetLight"] : [0, 100]}
                onChange={(values) => {
                    props.updateWebPartProperty("fieldSetLight", values);
                    setColorObj(cssObj(props.properties["fieldSetHue"], props.properties["fieldSetSat"],props.properties["fieldSetLight"],props.properties["fieldSetShades"][0]));


                }}
                renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc'
                    }}
                >
                    {children}
                </div>
                )}
                renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '30px',
                    width: '30px',
                    backgroundColor: '#999'
                    }}
          />
        )}
      />

            </fieldset>
            <fieldset data-property="fieldSetShades" className={styles.CustomPropertyPane} >
            <div className={styles.labelContainer}>
            <label>Shades</label>
            </div>
            <Range
                step={1}
                min={0}
                max={100}
                values={props.properties["fieldSetShades"] ? props.properties["fieldSetShades"] : [7]}
                onChange={(values) => {
                    props.updateWebPartProperty("fieldSetShades", values);
                    setColorObj(cssObj(props.properties["fieldSetHue"], props.properties["fieldSetSat"],props.properties["fieldSetLight"],props.properties["fieldSetShades"][0]));

                }}
                renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc'
                    }}
                >
                    {children}
                </div>
                )}
                renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '30px',
                    width: '30px',
                    backgroundColor: '#999'
                    }}
          />
        )}
      />

            </fieldset>
            <fieldset data-property="fieldSetDisplay" className={styles.CustomPropertyPane} >
            <Colors
            colorObject = {colorObj}
            ></Colors>
            <div>
            
            
           



        </div>
        </fieldset>
        </PropertyPanePortal>
    );
};