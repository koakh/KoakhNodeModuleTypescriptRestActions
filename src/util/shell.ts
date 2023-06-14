import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export interface ExecShellCommandResponse {
  code?: number;
  stdout?: string[];
  stderr?: string[];
  error?: string[];
}

/**
 * exec shell Script helper function
 * @param {*} cmd ex ./install.sh
 * @param {*} args ex.: folderId
 * @param {*} cwd ex.: /var/lib/c3apps/folderId
 * @param {*} showLog 
 */
export const execShellCommand = (cmd: string, args: string[] = [], cwd: string = null, env?: NodeJS.ProcessEnv, showLog: boolean = false): Promise<ExecShellCommandResponse> => new Promise((resolve, reject) => {
  try {
    const child: ChildProcessWithoutNullStreams = spawn(cmd, args, { cwd, env });
    child.stdin.setDefaultEncoding('utf-8');
    let stdout = '';
    let stderr = '';

    child.on('error', (error) => {
      if (showLog) console.error(`process threw error:  ${error}`);
      reject({ error });
    })
    child.on('close', (code: number) => {
      // this is not need
      // if (showLog) console.info(`process exited with code ${code}`);
    })
    // signal variable is null when the child process exits normally
    child.on('exit', (code: number, signal: NodeJS.Signals) => {
      // inner function: transform into array and sanitize strings
      const output = (input: any) => input.toString().trim().split('\n').map((e: string) => e.trim().toLocaleLowerCase());
      if (code > 0) {
        reject({ code, stderr: output(stderr) });
      } else {
        resolve({ code, stdout: output(stdout) });
      }
      // this is not need
      // if (showLog) console.info(`child process exited with code ${code} and signal ${signal}`);
    });
    child.stdout.on('data', (data) => {
      // if (showLog) console.info(`child stdout:\n${data}`);
      if (showLog) console.info(data.toString().replace(/\n*$/, ''));
      stdout += data;
    });
    child.stderr.on('data', (data) => {
      // if (showLog) console.info(`child stderr:\n${data}`);
      if (showLog) console.info(data.toString().replace(/\n*$/, ''));
      stderr += data;
    });
  } catch (error) {
    resolve({ error: error.toString().trim() });
  }
});
