import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Heading,
  Textarea,
  ButtonGroup,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import {decodeAll, encodeAll} from "./converter"

const texts = {
  title: "k8s secrets encoder/decoder",
  tageline: "encode or decode your secrets yaml file",
  mainTextAreaPlaceholder: "Enter your secrets yaml file here",
  outputTextAreaPlacholder: "This is wherer your output will show up"
}


export const ConverterComponent = () => {
  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");

  const encode = (yamlStr: string) => {
    try {
      const encodedYamlStr = encodeAll(yamlStr);
      setOutputText(encodedYamlStr);
    } catch (ex: any) {
      setOutputText(`Some error occured: ${ex?.message}`);
    }
  }

  const decode = (yamlStr: string) => {
    try {
      const decodedYamlStr = decodeAll(yamlStr);
      setOutputText(decodedYamlStr);
    } catch (ex: any) {
      setOutputText(`Some error occured: ${ex?.message}`);
    }
  }

  const clear = () => {
    setInputText("");
    setOutputText("");
  }

  return <VStack paddingX={'20px'} marginTop={'30px'}>
    <Textarea 
    minH={'30vh'} 
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    placeholder={texts.mainTextAreaPlaceholder}></Textarea>
    <ButtonGroup>
      <Button onClick={() => encode(inputText)}>Encode</Button>
      <Button onClick={clear}>Reset</Button>
      <Button onClick={() => decode(inputText)}>Decode</Button>
    </ButtonGroup>
    <Textarea 
    readOnly={true}
    minH={'30vh'} 
    value={outputText}
    placeholder={texts.outputTextAreaPlacholder}>
      <Button position="absolute" right="10px" top="10px">
        Submit
      </Button>
    </Textarea>
  </VStack>;
}


export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex minWidth='max-content' alignItems='center' gap='2'>
      <Box p='2'>
        <Heading size={'md'}>{texts.title}</Heading>
      </Box>
      <Spacer />
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
    <ConverterComponent />
  </ChakraProvider>
)
