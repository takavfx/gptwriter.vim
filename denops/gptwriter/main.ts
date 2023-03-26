import {
  Denops,
  ensureString,
  vars,
  fn,
} from './deps.ts';
import {
  get_content
} from './gptwriter.ts';

// Ignore to output debug log. Comment out as it's needed.
console.debug = function(){}

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async write(text: string): Promise<unknown> {
      ensureString(text);

      // Write from the pointer line.
      const line_num = await fn.line(denops, '.');

      try {
        const content = await get_content(denops, text);
        console.debug(content);
        await fn.append(denops, line_num, content.split(/\r?\n/g));
      } catch (error) {
        console.error(error);
      }
      return Promise.resolve();
    },

    async write_from_selected(text: string): Promise<unknown> {

      // Get lines from selected lines of a buffer.
      let operation_lines = await fn.getline(denops, "'<", "'>");
      if (text) {
        operation_lines.push(text);
      }
      const operation_text = operation_lines.join(' ');
      console.debug(operation_text);

      // Write from the 1 line after the end of selected pointer line.
      const line_num = await fn.line(denops, "'>");
      const next_line_num = +line_num + 1;
      console.debug(next_line_num);

      try {
        const content = await get_content(denops, operation_text);
        console.debug(content);
        await fn.append(denops, next_line_num, content.split(/\r?\n/g));
      } catch (error) {
        console.error(error);
      }
      return Promise.resolve();
    },

    async write_from_whole(text: string): Promise<unknown> {

      // Get lines from 1 to the end line of a buffer.
      let operation_lines = await fn.getline(denops, 1, '$');
      if (text) {
        operation_lines.push(text);
      }
      const operation_text = operation_lines.join(' ');
      console.debug(operation_text);

      // Write from the 1 line after the last line.
      const line_num = await fn.line(denops, '$');
      const next_line_num = +line_num + 1;
      console.debug(next_line_num);

      try {
        const content = await get_content(denops, operation_text);
        console.debug(content);
        await fn.append(denops, next_line_num, content.split(/\r?\n/g));
      } catch (error) {
        console.error(error);
      }
      return Promise.resolve();
    },

    async write_the_rest(): Promise<unknown> {
      let operation_word = await vars.global.get(denops, 'gptwrite_opwords_for_writetherest');
      if (!operation_word) {
        operation_word = 'write the rest';
      }

      let operation_lines = await fn.getline(denops, 1, '$');
      operation_lines.push(operation_word);
      const operation_text = operation_lines.join(' ');
      console.debug(operation_text);

      const line_num = await fn.line(denops, '.');
      const next_line_num = +line_num + 2;

      try {
        const content = await get_content(denops, operation_text);
        console.debug(content);
        await fn.append(denops, next_line_num, content.split(/\r?\n/g));
      } catch (error) {
        console.error(error);
      }
      return Promise.resolve();
    },
  }

  await denops.cmd(`command! -nargs=? GPTWrite call denops#request('${denops.name}', 'write', [<q-args>])`);
  await denops.cmd(`command! -nargs=? GPTWriteFromSelected call denops#request('${denops.name}', 'write_from_selected', [<q-args>])`);
  await denops.cmd(`command! -nargs=? GPTWriteFromWhole call denops#request('${denops.name}', 'write_from_whole', [<q-args>])`);
  await denops.cmd(`command! GPTWriteTheRest call denops#request('${denops.name}', 'write_the_rest', [])`);
}

