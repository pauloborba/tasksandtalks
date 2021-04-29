Feature: Visualização de informações (email, chat, etc.) associadas a uma tarefa (já lidas, que precisam de atenção, etc.)
        As I usuário aluno responsável por uma tarefa em um projeto cadastrado no sistema Tasks and Talks.
        I want to visualizar a lista de informações (mensagens) associadas a uma tarefa
        So that saber o status e a prioridade de cada informação (mensagem).

Scenario: marcar atualização das mensagens associadas a uma tarefa
Given eu estou na página de projetos
And eu posso visualizar o projeto "Tasks and Talks"
And eu posso seguir para a página do projeto "Tasks and Talks"
And eu posso visualizar uma tarefa "Duplicar um projeto"
And eu posso seguir para a página da tarefa "Duplicar um projeto"
And eu estou na página da tarefa "Duplicar um projeto"
When eu indico a atualização das informações da tarefa
Then eu vejo a data atual na coluna "Última atualização"