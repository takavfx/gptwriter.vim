# gptwriter.vim

## Install


### Get API key from Open AI

This plugin is driven by GPT, so get Open AI's API key first.

Please reference [Account API Kyes - OpenAI API](https://platform.openai.com/account/api-keys) page and generate your api key.

### Set installation and settings config

If you mange plugins with [dein.vim](https://github.com/Shougo/dein.vim) and managing with toml file, then write config like below.

```toml:.dein.toml
[[plugins]]
repo = 'takavfx/gptwriter.vim'
depends = 'denops.vim'
hook_add = '''
let g:gptwriter_key = '<openapi_key>' # Or you have to manage seprately for safety.
'''
```

## Usage

### Ask GPT and let he/she write

GPTWriter writes response from GPT (ChatGPT) at the cursor in current buffer.
Execute `GPTWrite` command with arg like this:

```
:GPTWrite <a sentence to write>
```

For example:

```
:GPTWrite think about shooting game
```

### Ask GPT and let he/she write THE REST FROM SELECTED LINES

```
:GPTWriteFromSelected <(*Optional) operation words>
```

### Ask GPT and let he/she write THE REST FROM WHOLE LINES

```
:GPTWriteFromWhole
```

### Ask GPT and let he/she write THE REST with defineded words.

Let GPT write the rest from activat entire buffer.

```
:GPTWriteTheRest <(*Optional) operation words>
```


