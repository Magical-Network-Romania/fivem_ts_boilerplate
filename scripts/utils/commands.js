//@ts-check

import { spawn } from "node:child_process";

/**
 * Spawn a child process and executes the command asynchronously.
 * @param {string} command The command to execute.
 * @returns {Promise<{ code: number, signal: string | null }>} Resolves with the exit code and signal of the command.
 * @throws {Error} If the command exits with a non-zero code.
 */
export function exec(command) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, { stdio: "inherit", shell: true });

		child.on("exit", (code, signal) => {
			if (code === 0) resolve({ code, signal });
			else reject(new Error(`Command '${command}' exited with code ${code} and signal ${signal}`));
		});
	});
}
