import { FlexWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Text } from "rebass";

import { LayoutPublic } from "../src/components/Layout";

const MentionPage = () => (
  <LayoutPublic>
    <FlexWrapper p="4" my="50px">
      <Box lineHeight="1.4">
        <Heading1 mb="2">
          <a className="anchor hidden-xs" href="#Mentions-légales" title="Mentions-légales">
            <span className="octicon octicon-link" />
          </a>
          Mentions légales
        </Heading1>
        <Text>
          Le site{" "}
          <a href="https://emjpm.num.social.gouv.fr/" rel="noopener noreferrer" target="_blank">
            e-MJPM
          </a>{" "}
          vise à trouver rapidement le bon professionnel pour les majeurs à protéger.
        </Text>
        <Text>
          Le{" "}
          <a href="https://github.com/SocialGouv/emjpm" rel="noopener noreferrer" target="_blank">
            code du logiciel
          </a>{" "}
          est libre, et peut donc être vérifié et amélioré par tout·e·s.
        </Text>
        <Text>
          <a href="https://emjpm.num.social.gouv.fr/" rel="noopener noreferrer" target="_blank">
            e-MJPM
          </a>{" "}
          est édité par{" "}
          <a href="https://incubateur.social.gouv.fr/" rel="noopener noreferrer" target="_blank">
            l’Incubateur des ministères sociaux
          </a>{" "}
          situé :
        </Text>
        <Text>
          Tour Mirabeau
          <br />
          39-43 Quai André Citroën
          <br />
          75015 PARIS
        </Text>
        <Text>Tél. : 01 40 56 60 00</Text>
        <h4 id="Directeur-de-la-publication">
          <a
            className="anchor hidden-xs"
            href="#Directeur-de-la-publication"
            title="Directeur-de-la-publication"
          >
            <span className="octicon octicon-link" />
          </a>
          Directeur de la publication
        </h4>
        <Text>Hélène BRISSET</Text>
        <h4 id="Hébergement">
          <a className="anchor hidden-xs" href="#Hébergement" title="Hébergement">
            <span className="octicon octicon-link" />
          </a>
          Hébergement
        </h4>
        <Text>
          Ce site est hébergé en propre par le Ministère des Affaires sociales et de la Santé :
        </Text>
        <Text>
          Ministère des affaires sociales et de la santé
          <br />
          14 avenue Duquesne
          <br />
          75530 PARIS
        </Text>
        <Heading1 my="2">
          <a
            className="anchor hidden-xs"
            href="#Modalités-d’utilisation"
            title="Modalités-d’utilisation"
          >
            <span className="octicon octicon-link" />
          </a>
          Modalités d’utilisation
        </Heading1>
        <Text>
          <b>
            Important : ce site est en cours de construction. Les fonctionnalités proposées sont
            amenées à évoluer.
          </b>
        </Text>
        <Text>
          Le présent document a pour objet de régler les relations entre les différents intervenants
          sur la plateforme.
        </Text>
        <Text>
          Toute utilisation du service est subordonnée à l’acceptation préalable et au respect
          intégral des présentes conditions générales d’utilisation (CGU).
        </Text>
        <Text>
          La présente plateforme n’a pas vocation à collecter, stockées ou recevoir des données à
          caractère personnel relatives aux majeurs protégés.
        </Text>
        <Text>La plateforme permet :</Text>
        <ul>
          <li>
            aux Mandataires de visualiser, gérer et comptabiliser en temps réel les mesures qui lui
            sont attribuées ;
          </li>
          <li>
            aux Magistrats d’accéder à l’ensemble des mandataires sur son territoire de compétence
            et de réserver une mesure en direction d’un mandataire.
          </li>
        </ul>
        <h4 id="Inscription-sur-la-plateforme-et-ouverture-de-l’accès-à-la-plateforme">
          <a
            className="anchor hidden-xs"
            href="#Inscription-sur-la-plateforme-et-ouverture-de-l’accès-à-la-plateforme"
            title="Inscription-sur-la-plateforme-et-ouverture-de-l’accès-à-la-plateforme"
          >
            <span className="octicon octicon-link" />
          </a>
          Inscription sur la plateforme et ouverture de l’accès à la plateforme
        </h4>
        <Text>
          La demande d’inscription est réalisée par voie électronique depuis la plateforme.
          L’inscription est ouverte aux seuls professionels chargés de la protection des majeurs.
        </Text>
        <Text>Pour créer un compte, les informations récoltées sont les suivantes :</Text>
        <ul>
          <li>nom et prénom</li>
          <li>courriel professionnel</li>
          <li>le cas échéant, adresse</li>
        </ul>
        <Text>
          Lors de l’inscription, le demandeur choisit son rôle (individuel, préposé, service,
          tribunal instance) et il détermine un mot de passe. Le mot de passe doit être choisi par
          l’utilisateur de façon à ce qu’il ne puisse pas être deviné par un tiers. Cette
          information doit être sécurisées, conservées et non-cédées.
        </Text>
        <Text>
          Les administrateurs de la plateforme se chargent de valider, une à une, les demandes
          d’inscriptions. Ils peuvent librement accepter ou refuser une inscription.
        </Text>
        <h4 id="Fonctionnalités-proposées-aux-Magistrats-">
          <a
            className="anchor hidden-xs"
            href="#Fonctionnalités-proposées-aux-Magistrats-"
            title="Fonctionnalités-proposées-aux-Magistrats-"
          >
            <span className="octicon octicon-link" />
          </a>
          Fonctionnalités proposées aux Magistrats :
        </h4>
        <Text>
          Les Magistrats peuvent accéder à une cartographie des mesures effectives sur leur
          territoire. Cette information est agrégée au niveau de la commune (code postal).
        </Text>
        <Text>
          Les Magistrats ont accès aux mandataires présents sur le ressort de leurs tribunaux
          d’instance, et notamment leurs profils.
        </Text>
        <Text>
          Les Magistrats peuvent renseigner la Mesure et sélectionnent le Mandataire chargé de cette
          dernière.
        </Text>
        <Text>
          Les Magistrats ont accès à l’ensemble des mesures réservées dans le ressort de leurs
          tribunaux respectifs.
        </Text>
        <h4 id="Fonctionnalités-proposées-aux-Mandataires-">
          <a
            className="anchor hidden-xs"
            href="#Fonctionnalités-proposées-aux-Mandataires-"
            title="Fonctionnalités-proposées-aux-Mandataires-"
          >
            <span className="octicon octicon-link" />
          </a>
          Fonctionnalités proposées aux Mandataires :
        </h4>
        <Text>Les Mandataires peuvent tenir à jour leurs profils.</Text>
        <Text>
          Les Mandataires peuvent gérer l’ensemble des mesures qui leur ont été attribuées : créer
          ou importer une mesure (pour compléter la base de données de la plateforme), modifier,
          mettre fin au mandat et valider une mesure réservée.
        </Text>
        <Text>Les Mandataires ont accès à une cartographie de leurs mesures respectives.</Text>
        <Text>
          Les Mandataires sont notifiés par courrier électronique lorsqu’un Magistrat les retient
          pour appliquer une mesure.
        </Text>
        <Text>Les Mandataires peuvent accuser la réception de la mesure ainsi notifiée.</Text>
        <h4 id="Traitement-des-données-à-caractère-personnel">
          <a
            className="anchor hidden-xs"
            href="#Traitement-des-données-à-caractère-personnel"
            title="Traitement-des-données-à-caractère-personnel"
          >
            <span className="octicon octicon-link" />
          </a>
          Traitement des données à caractère personnel
        </h4>
        <Text>
          Les utilisateurs de la plateforme dispose, conformément aonformément aux dispositions de
          la loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés,
          vous disposez d’un droit d’accès, de rectification, d’opposition et d’effacement sur les
          données les concernant que vous pouvez exercer à tout moment.
        </Text>
        <Text>
          Pour cela, il vous suffit de nous contacter, en justifiant de votre identité, par voie
          électronique ou support.emjpm@fabrique.social.gouv.fr ou à l’adresse postale suivante :
        </Text>
        <Text>
          Direction des systèmes d’information
          <br />
          Ministère des affaires sociales et de la santé
          <br />
          39-43 Quai André Citroën
          <br />
          75015 PARIS
        </Text>
        <h4 id="Utilisation-de-témoins-de-connexion-«-cookies-»">
          <a
            className="anchor hidden-xs"
            href="#Utilisation-de-témoins-de-connexion-«-cookies-»"
            title="Utilisation-de-témoins-de-connexion-«-cookies-»"
          >
            <span className="octicon octicon-link" />
          </a>
          Utilisation de témoins de connexion (« cookies »)
        </h4>
        <Text>
          Nous collectons également des données par l’intermédiaire de dispositifs appelés “cookies”
          permettant d’établir des mesures statistiques de fréquentation et d’utilisation du site
          pouvant être utilisées à des fins de suivi et d’amélioration du service :
        </Text>
        <ul>
          <li>Les données collectées ne sont pas recoupées avec d’autres traitements.</li>
          <li>Le cookie déposé sert uniquement à la production de statistiques anonymes.</li>
          <li>
            Le cookie ne permet pas de suivre la navigation de l’internaute sur d’autres sites.
          </li>
        </ul>
        <Text>
          La mesure d’audience (nombre de visites, pages consultées) est réalisée par un outil libre
          intitulé Matomo spécifiquement paramétré, respectant les conditions d’exemption du
          consentement de l’internaute définies par la recommandation « Cookies » de la Commission
          nationale informatique et libertés (CNIL).
        </Text>
        <Text>
          Pour la période de construction, ce site utilise l’outil Hotjar, notamment pour obtenir
          les retours écrits des utilisateurs concernant la pertinence des résultats proposés dans
          le cadre de leurs recherches. Hotjar utilise des cookies et d’autres technologies pour
          collecter des informations sur l’équipement et les comportements des visiteurs. Cet outil
          stocke ces informations dans un profil utilisateur pseudonymisé. Ni Hotjar ni l’éditeur
          n’utiliseront ces informations pour identifier des utilisateurs individuels ou pour les
          associer à d’autres données. Vous pouvez consulter la politique de confidentialité de{" "}
          <a
            href="https://www.hotjar.com/legal/policies/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            Hotjar
          </a>
          . Ces données ne seront jamais cédées. La durée de conservation de ces informations ne
          saurait dépasser deux ans.
        </Text>
        <Text>
          Vous pouvez librement désactiver ce service, sur l’ensemble des sites internet
          susceptibles de l’utiliser en suivant la procédure présentée{" "}
          <a
            href="https://www.hotjar.com/legal/compliance/opt-out"
            rel="noopener noreferrer"
            target="_blank"
          >
            ici
          </a>
          .
        </Text>
        <Text>
          À tout moment, vous pouvez refuser l’utilisation des cookies et désactiver le dépôt sur
          votre ordinateur en utilisant la fonction dédiée de votre navigateur (fonction disponible
          notamment sur Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple Safari
          et Opera).
        </Text>
        <Text>
          L’ensemble de ces informations sont nécessaires à la mise en oeuvre de ce service public
          numérique.
        </Text>
        <Heading1 my="2">
          <a className="anchor hidden-xs" href="#Accessibilité" title="Accessibilité">
            <span className="octicon octicon-link" />
          </a>
          Accessibilité
        </Heading1>
        <Text>
          La conformité aux normes d’accessibilité numérique est un objectif ultérieur mais nous
          tâchons de rendre dès la conception, ce site accessible à toutes et à tous.
        </Text>
        <h4 id="Signaler-un-dysfonctionnement">
          <a
            className="anchor hidden-xs"
            href="#Signaler-un-dysfonctionnement"
            title="Signaler-un-dysfonctionnement"
          >
            <span className="octicon octicon-link" />
          </a>
          Signaler un dysfonctionnement
        </h4>
        <Text>
          Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une
          fonctionnalité du site, merci de nous en faire part.
        </Text>
        <Text>
          Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en droit de faire
          parvenir vos doléances ou une demande de saisine au Défenseur des droits.
        </Text>
        <h4 id="En-savoir-plus">
          <a className="anchor hidden-xs" href="#En-savoir-plus" title="En-savoir-plus">
            <span className="octicon octicon-link" />
          </a>
          En savoir plus
        </h4>
        <Text>
          Pour en savoir plus sur la politique d’accessibilité numérique de l’État :{" "}
          <a
            href="http://references.modernisation.gouv.fr/accessibilite-numerique"
            rel="noopener noreferrer"
            target="_blank"
          >
            http://references.modernisation.gouv.fr/accessibilite-numerique
          </a>
        </Text>
        <Heading1 my="2">
          <a className="anchor hidden-xs" href="#Sécurité" title="Sécurité">
            <span className="octicon octicon-link" />
          </a>
          Sécurité
        </Heading1>
        <Text>
          Le site est protégé par un certificat électronique, matérialisé pour la grande majorité
          des navigateurs par un cadenas. Cette protection participe à la confidentialité des
          échanges.
        </Text>
      </Box>
      <div className="ui-toc dropup unselectable hidden-print" style={{ display: "none" }}>
        <div className="pull-right dropdown">
          <a
            id="tocLabel"
            className="ui-toc-label btn btn-default"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            title="Table of content"
          >
            <i className="fa fa-bars" />
          </a>
          <ul id="ui-toc" className="ui-toc-dropdown dropdown-menu" aria-labelledby="tocLabel">
            <div className="toc">
              <ul className="nav">
                <li className="">
                  <a href="#eMJPM--Paquet-legal" title="eMJPM : Paquet legal">
                    eMJPM : Paquet legal
                  </a>
                  <ul className="nav">
                    <li className="">
                      <a href="#Mentions-légales" title="Mentions légales">
                        Mentions légales
                      </a>
                      <ul className="nav">
                        <li className="">
                          <a
                            href="#Directeur-de-la-publication"
                            title="Directeur de la publication"
                          >
                            Directeur de la publication
                          </a>
                        </li>
                        <li className="">
                          <a href="#Hébergement" title="Hébergement">
                            Hébergement
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="">
                      <a href="#Modalités-d’utilisation" title="Modalités d’utilisation">
                        Modalités d’utilisation
                      </a>
                      <ul className="nav">
                        <li className="">
                          <a
                            href="#Inscription-sur-la-plateforme-et-ouverture-de-l’accès-à-la-plateforme"
                            title="Inscription sur la plateforme et ouverture de l’accès à la plateforme"
                          >
                            Inscription sur la plateforme et ouverture de l’accès à la plateforme
                          </a>
                        </li>
                        <li className="">
                          <a
                            href="#Fonctionnalités-proposées-aux-Magistrats-"
                            title="Fonctionnalités proposées aux Magistrats :"
                          >
                            Fonctionnalités proposées aux Magistrats :
                          </a>
                        </li>
                        <li className="">
                          <a
                            href="#Fonctionnalités-proposées-aux-Mandataires-"
                            title="Fonctionnalités proposées aux Mandataires :"
                          >
                            Fonctionnalités proposées aux Mandataires :
                          </a>
                        </li>
                        <li className="">
                          <a
                            href="#Traitement-des-données-à-caractère-personnel"
                            title="Traitement des données à caractère personnel"
                          >
                            Traitement des données à caractère personnel
                          </a>
                        </li>
                        <li className="">
                          <a
                            href="#Utilisation-de-témoins-de-connexion-«-cookies-»"
                            title="Utilisation de témoins de connexion (« cookies »)"
                          >
                            Utilisation de témoins de connexion (« cookies »)
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#Accessibilité" title="Accessibilité">
                        Accessibilité
                      </a>
                    </li>
                    <li className="">
                      <a href="#Sécurité" title="Sécurité">
                        Sécurité
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="toc-menu">
              <a className="expand-toggle" href="#">
                Expand all
              </a>
              <a className="back-to-top" href="#">
                Back to top
              </a>
              <a className="go-to-bottom" href="#">
                Go to bottom
              </a>
            </div>
          </ul>
        </div>
      </div>
      <div
        id="ui-toc-affix"
        className="ui-affix-toc ui-toc-dropdown unselectable hidden-print"
        data-spy="affix"
        style={{ display: "none", top: "17px" }}
      >
        <div className="toc">
          <ul className="nav">
            <li className="">
              <a href="#eMJPM--Paquet-legal" title="eMJPM : Paquet legal">
                eMJPM : Paquet legal
              </a>
              <ul className="nav">
                <li className="">
                  <a href="#Mentions-légales" title="Mentions légales">
                    Mentions légales
                  </a>
                  <ul className="nav">
                    <li className="">
                      <a href="#Directeur-de-la-publication" title="Directeur de la publication">
                        Directeur de la publication
                      </a>
                    </li>
                    <li className="">
                      <a href="#Hébergement" title="Hébergement">
                        Hébergement
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <a href="#Modalités-d’utilisation" title="Modalités d’utilisation">
                    Modalités d’utilisation
                  </a>
                  <ul className="nav">
                    <li className="">
                      <a
                        href="#Inscription-sur-la-plateforme-et-ouverture-de-l’accès-à-la-plateforme"
                        title="Inscription sur la plateforme et ouverture de l’accès à la plateforme"
                      >
                        Inscription sur la plateforme et ouverture de l’accès à la plateforme
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#Fonctionnalités-proposées-aux-Magistrats-"
                        title="Fonctionnalités proposées aux Magistrats :"
                      >
                        Fonctionnalités proposées aux Magistrats :
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#Fonctionnalités-proposées-aux-Mandataires-"
                        title="Fonctionnalités proposées aux Mandataires :"
                      >
                        Fonctionnalités proposées aux Mandataires :
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#Traitement-des-données-à-caractère-personnel"
                        title="Traitement des données à caractère personnel"
                      >
                        Traitement des données à caractère personnel
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#Utilisation-de-témoins-de-connexion-«-cookies-»"
                        title="Utilisation de témoins de connexion (« cookies »)"
                      >
                        Utilisation de témoins de connexion (« cookies »)
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#Accessibilité" title="Accessibilité">
                    Accessibilité
                  </a>
                </li>
                <li className="">
                  <a href="#Sécurité" title="Sécurité">
                    Sécurité
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="toc-menu">
          <a className="expand-toggle" href="#">
            Expand all
          </a>
          <a className="back-to-top" href="#">
            Back to top
          </a>
          <a className="go-to-bottom" href="#">
            Go to bottom
          </a>
        </div>
      </div>
    </FlexWrapper>
  </LayoutPublic>
);

export default MentionPage;
