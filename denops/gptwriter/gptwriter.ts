import {
  OpenAI,
  Denops,
  vars
} from './deps.ts';

export async function get_content(denops: Denops, text: string): Promise<string> {
  const key = await vars.globals.get(denops, "gptwriter_key") as string;
  if (!key) {
    throw new Error('g:gptwriter_key is not set.');
  }

  const instance = new OpenAI(key);
  const result = await instance.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {"role": "user", "content": text}
    ],
  });
  const content = result.choices[0].message.content as string;
  return content;
}

