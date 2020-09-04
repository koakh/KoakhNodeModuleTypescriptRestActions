import { spawn, ChildProcessWithoutNullStreams } from "child_process";

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
export const execShellCommand = (cmd: string, args: string[] = [], cwd: string = null, showLog: boolean = false): Promise<ExecShellCommandResponse> => new Promise((resolve, reject) => {
  try {
    const child: ChildProcessWithoutNullStreams = spawn(cmd, args, { cwd });
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
    child.on('exit', function (code: number, signal: NodeJS.Signals) {
      // transform into array and sanitize strings
      let output = stdout.toString().trim().split('\n').map(e => e.trim().toLocaleLowerCase());
      if (code > 0) {
        resolve({ code, stdout: output });
      } else {
        resolve({ code, stdout: output });
      }
      // this is not need
      // if (showLog) console.info(`child process exited with code ${code} and signal ${signal}`);
    });
    child.stdout.on('data', (data) => {
      if (showLog) console.info(`child stdout:\n${data}`);
      stdout += data;
    });
    child.stderr.on('data', (data) => {
      if (showLog) console.info(`child stderr:\n${data}`);
      stderr += data;
    });
    child.stderr.on('data', (data) => {
      if (showLog) console.info(`data:\n${data}`);
      stderr += data;
    });
  } catch (error) {
    resolve({ error: error.toString().trim() });
  }
});
