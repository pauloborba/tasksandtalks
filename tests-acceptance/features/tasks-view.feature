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

Scenario: ordenar mensagens pela coluna "Atenção"
Given eu estou na página da tarefa "Duplicar um projeto"
And eu vejo que a mensagem "Bugfix encontrado" com a coluna "Atenção" marcada com "Não" e a coluna "Resolvido" marcado com "Não"
And eu vejo que a mensagem "Revise o PR #33 no github" com a coluna "Atenção" marcada com "Sim" e a coluna "Resolvido" marcado com "Não"
When eu indico a ordenação por prioridade
Then eu posso visualizar a lista de informações organizadas com as mensagens marcadas com "Sim" em "Atenção" primeiro

Scenario: marcar mensagem como resolvida
Given eu estou na página da tarefa "Duplicar um projeto"
And eu vejo que a mensagem "Revise o PR #33 no github" com a coluna "Atenção" marcada com "Sim" e a coluna "Resolvido" marcado com "Não"
When eu marco a mensagem "Revise o PR #33 no github" na indicação de "Resolvido"
Then eu posso visualizar a mensagem "Revise o PR #33 no github" com a coluna "Resolvido" marcada com "Sim"

Scenario: marcar mensagem como prioritária
Given eu estou na página da tarefa "Duplicar um projeto"
And eu vejo que a mensagem "Bugfix encontrado" com a coluna "Atenção" marcada com "Não" e a coluna "Resolvido" marcado com "Não"
When eu marco a mensagem "Bugfix encontrado" na indicação de "Atenção"
Then eu posso visualizar a mensagem "Bugfix encontrado" com a coluna "Atenção" marcada com "Sim"