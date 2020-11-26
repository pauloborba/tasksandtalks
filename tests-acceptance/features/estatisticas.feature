Feature: As a user
        I want to view statistics data about my projects
        So that I can analyse my set of projects characteristics

Scenario: Visualização de estatísticas de projetos ativos
    Given Eu estou na pagina 'Estatisticas'
    And Eu vejo um menu com as subsecoes: 'Projetos Ativos', 'Projetos Arquivados' e 'Dados Gerais'
    #And Eu tenho um total de '10' projeto(s), sendo '4' arquivado(s) e '6' ativo(s)
    When Eu seleciono a subseção 'Projetos Ativos'
    Then Eu vejo que '60%' do total de projetos está 'ativo'
    And Eu vejo que ha '6' projetos 'ativos'

Scenario: Visualização de estatísticas de projetos arquivados
    Given Eu estou na pagina 'Estatisticas'
    And Eu vejo um menu com as subsecoes: 'Projetos Ativos', 'Projetos Arquivados' e 'Dados Gerais'
    #And Eu tenho um total de '10' projeto(s), sendo '4' arquivado(s) e '6' ativo(s)
    When Eu seleciono a subseção 'Projetos Arquivados'
    Then Eu vejo que '40%' do total de projetos está 'arquivado'
    And Eu vejo que ha '4' projetos 'arquivados'

Scenario: Visualização de estatísticas gerais dos projetos quando há projetos arquivados
    Given Eu estou na pagina 'Estatisticas'
    #And Eu tenho um total de “10” projeto(s), sendo “4” arquivado(s) e “6” ativo(s)
    #And Eu tenho “2” projeto(s) “arquivado(s)” criado(s) no mês “01/2020” e concluído(s) em “15 dias”
    #And Eu tenho “2” projeto(s) “arquivado(s)” criado(s) no mês “02/2020” e concluído(s) em “5 dias”
    #And Eu tenho “6” projeto(s) “ativo(s)” criado(s) a partir do mês “01/2020”
    #And Eu estou no mês “11/2020”
    And Eu vejo um menu com as subsecoes: 'Projetos Ativos', 'Projetos Arquivados' e 'Dados Gerais'
    When Eu seleciono a subseção 'Dados Gerais'
    Then Eu vejo que a 'duração média' dos projetos em 'dias' é '10'
    And Eu vejo que a 'média de projetos criados por mes' dos projetos em 'projetos por mes' é '0.90'