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
hook_add = '''
let g:gptwriter#key = '<openapi_key>'
'''
```

## Usage

### Ask GPT and let he/she write

GPTWriter writes response from GPT (ChatGPT) at the cursor in an active buffer.
Execute `GPTWrite` command with arg like this:

```
:GPTWRite <sentence to write>
```

For example:

```
:GPTWRite think about shooting game
```

