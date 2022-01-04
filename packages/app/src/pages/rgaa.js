import { Card } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutPublic } from "~/containers/Layout";
import { FlexWrapper } from "~/components/Grid";

import { Heading } from "~/components";

import config from "~/config";

const MentionsLegalesPage = () => (
  <>
    <Helmet>
      <title>Déclaration d'accessibilité | e-MJPM </title>
    </Helmet>
    <LayoutPublic>
      <FlexWrapper p="4" my="50px">
        <Card p={3}>
          <Heading size={1}>Déclaration d'accessibilité</Heading>
          <p>
            <span>DGCS</span> s’engage à rendre son service accessible,
            conformément à l’article 47 de la loi n° 2005-102 du 11 février
            2005.
          </p>
          <p>
            Cette déclaration d’accessibilité s’applique à <span>eMJPM</span>.
          </p>
          <Heading size={2}>État de conformité</Heading>
          <p>
            <span>eMJPM est </span>
            <b>
              <span data-printfilter="lowercase">non conforme</span> avec le{" "}
              <span data-negate="">RGAA 4.1</span>.{" "}
            </b>
            <span>Le site n'a encore pas été audité.</span>
          </p>
          <Heading size={2}>Contenus non accessibles</Heading>
          <Heading size={2}>
            Établissement de cette déclaration d'accessibilité
          </Heading>
          <p>
            Cette déclaration a été établie le{" "}
            <b>
              <span>16 juin 2021</span>
            </b>
            .
          </p>
          <Heading size={3}>Technologies utilisées</Heading>
          <p>
            L'accessibilité de <span>eMJPM</span> s'appuie sur les technologies
            suivantes :
          </p>
          <ul class="technical-information technologies-used">
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <Heading size={2}>Amélioration et contact</Heading>
          <p>
            Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
            pouvez contacter le responsable de <span>eMJPM</span> pour être
            orienté vers une alternative accessible ou obtenir le contenu sous
            une autre forme.
          </p>
          <ul class="basic-information feedback h-card">
            <li>
              E-mail :{" "}
              <a href={`mailto:${config.EMAIL_SUPPORT}`}>
                ${config.EMAIL_SUPPORT}
              </a>
            </li>
            <li>
              <a href="https://github.com/SocialGouv/emjpm">
                https://github.com/SocialGouv/emjpm
              </a>
            </li>
          </ul>
          <Heading size={2}>Voie de recours</Heading>
          <p>
            Cette procédure est à utiliser dans le cas suivant : vous avez
            signalé au responsable du site internet un défaut d’accessibilité
            qui vous empêche d’accéder à un contenu ou à un des services du
            portail et vous n’avez pas obtenu de réponse satisfaisante.
          </p>
          <p>Vous pouvez :</p>
          <ul>
            <li>
              Écrire un message au{" "}
              <a href="https://formulaire.defenseurdesdroits.fr/">
                Défenseur des droits
              </a>
            </li>
            <li>
              Contacter{" "}
              <a href="https://www.defenseurdesdroits.fr/saisir/delegues">
                le délégué du Défenseur des droits dans votre région
              </a>
            </li>
            <li>
              Envoyer un courrier par la poste (gratuit, ne pas mettre de
              timbre) :<br />
              Défenseur des droits
              <br />
              Libre réponse 71120 75342 Paris CEDEX 07
            </li>
          </ul>
          <hr />
          <p>
            Cette déclaration d'accessibilité a été créé le{" "}
            <span>16 juin 2021</span> grâce au{" "}
            <a href="https://betagouv.github.io/a11y-generateur-declaration/#create">
              Générateur de Déclaration d'Accessibilité de BetaGouv
            </a>
            .
          </p>
        </Card>
      </FlexWrapper>
    </LayoutPublic>
  </>
);

export default MentionsLegalesPage;
