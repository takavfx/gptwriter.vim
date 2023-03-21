import {
  Denops,
  ensureString,
  vars,
  fn,
} from './deps.ts';
import {
  get_content
} from './gptwriter.ts';

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async write(text: string): Promise<unknown> {
      ensureString(text);

      try {
        const content = await get_content(denops, text);
        const line = await fn.line(denops, '.');
        await fn.setline(denops, line, content.split(/\r?\n/g));
      } catch (error) {
        console.error(error);
      }
      return Promise.resolve();
    },

    async write_the_rest(): Promise<unknown> {
      const operation_word = 'write the rest';

      const lines = await fn.getline(denops, 1, '$');
      const operation_lines = lines.push(operation_word);
      const content_text = lines.join(' ');
      const line = await fn.line(denops, '.');
      try {
        const content = await get_content(denops, content_text);
        await fn.setline(denops, line, content.split(/\r?\n/g));
      } catch (error) {
        console.error(error);
      }
      return Promise.resolve();
    }
  }

  await denops.cmd(`command! -nargs=? GPTWrite call denops#request('${denops.name}', 'write', [<q-args>])`);
  await denops.cmd(`command! GPTWriteTheRest call denops#request('${denops.name}', 'write_the_rest', [])`);
}

